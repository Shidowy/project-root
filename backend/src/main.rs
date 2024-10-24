use axum::{http::StatusCode, response::IntoResponse, routing::{get, post}, Json, Router, Extension};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use sqlx::{PgPool, FromRow};
use dotenvy::dotenv;
use std::env;
use serde::{Deserialize, Serialize};
mod database;  // Add this line

#[derive(Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Deserialize)]
struct LoginRequest {
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

    let pool = database::establish_connection().await;

    println!("Connected to the database successfully!");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(root))
        .route("/signup", post(create_user))
        .route("/login", post(login_user))
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
        r#"INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email"#,
        user.name,
        user.email,
        user.password  // In a production environment, ensure this is hashed!
    )
    .fetch_one(&pool)
    .await {
        Ok(row) => {
            let user_response = UserResponse {
                id: row.id,
                name: row.name,
                email: Some(row.email),
            };
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

async fn login_user(
    Extension(pool): Extension<PgPool>,
    Json(credentials): Json<LoginRequest>,
) -> impl IntoResponse {
    match sqlx::query!(
        r#"SELECT id, name, email FROM "User" 
        WHERE email = $1 AND password = $2"#,
        credentials.email,
        credentials.password
    )
    .fetch_optional(&pool)
    .await {
        Ok(Some(row)) => {
            let user_response = UserResponse {
                id: row.id,
                name: row.name,
                email: Some(row.email),
            };
            (StatusCode::OK, Json(user_response)).into_response()
        },
        Ok(None) => {
            (
                StatusCode::UNAUTHORIZED,
                Json(serde_json::json!({
                    "error": "Invalid email or password"
                }))
            ).into_response()
        },
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(serde_json::json!({
                    "error": "Login failed"
                }))
            ).into_response()
        }
    }
}