use axum::{http::StatusCode, response::IntoResponse, routing::{get, post}, Json, Router, Extension};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use sqlx::{PgPool, FromRow};
use dotenvy::dotenv;
use std::env;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Serialize, FromRow, Debug)]
struct UserResponse {
    id: i32,
    name: Option<String>,
    email: Option<String>,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to the database");

    println!("Connected to the database successfully!");

    // Print the current users in the database
    print_users(&pool).await.expect("Failed to fetch users");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(root))
        .route("/signup", post(create_user))
        .layer(Extension(pool))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);
    
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root(Extension(_pool): Extension<PgPool>) -> impl IntoResponse {
    let response = serde_json::json!({
        "message": "Hello, World!",
        "status": "success"
    });
    
    (StatusCode::OK, Json(response))
}

async fn create_user(
    Extension(pool): Extension<PgPool>,
    Json(user): Json<CreateUserRequest>,
) -> impl IntoResponse {
    match sqlx::query!(
        r#"INSERT INTO "User" (name, email) VALUES ($1, $2) RETURNING id, name, email"#,
        user.name,
        user.email
    )
    .fetch_one(&pool)
    .await {
        Ok(row) => {
            let user_response = UserResponse {
                id: row.id,
                name: row.name,
                email: Some(row.email),
            };
            // Print the current users in the database after inserting a new user
            print_users(&pool).await.expect("Failed to fetch users");
            (StatusCode::CREATED, Json(user_response)).into_response()
        },
        Err(e) => {
            if e.to_string().contains("unique constraint") {
                (
                    StatusCode::CONFLICT,
                    Json(serde_json::json!({
                        "error": "Email already exists"
                    }))
                ).into_response()
            } else {
                eprintln!("Database error: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(serde_json::json!({
                        "error": "Failed to create user"
                    }))
                ).into_response()
            }
        }
    }
}

async fn print_users(pool: &PgPool) -> Result<(), sqlx::Error> {
    let users: Vec<UserResponse> = sqlx::query_as!(UserResponse, r#"SELECT id, name, email FROM "User""#)
        .fetch_all(pool)
        .await?;

    println!("Current users in the database:");
    for user in users {
        println!("{:?}", user);
    }

    Ok(())
}

