use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router, Extension};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use sqlx::PgPool;
use dotenvy::dotenv;
use std::env;

#[tokio::main]
async fn main() {
    // Load .env file
    dotenv().ok();

    // Get database URL and connect
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to the database");

    println!("Connected to the database successfully!");

    // Set up CORS
    let cors = CorsLayer::new().allow_origin(Any);

    // Create router with routes and layers
    let app = Router::new()
        .route("/", get(root))
        .layer(Extension(pool))
        .layer(cors);

    // Set up and start server
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



// use axum::{
//     http::StatusCode,
//     response::IntoResponse,
//     routing::{get, post},
//     Json, Router, Extension
// };
// use std::net::SocketAddr;
// use tower_http::cors::{Any, CorsLayer};
// use sqlx::PgPool;
// use dotenvy::dotenv;
// use std::env;
// use serde::{Deserialize, Serialize};

// // Define your database structs
// #[derive(Serialize, Deserialize)]
// struct User {
//     id: Option<i32>,
//     name: String,
//     email: String
// }

// #[tokio::main]
// async fn main() {
//     dotenv().ok();

//     let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
//     let pool = PgPool::connect(&database_url)
//         .await
//         .expect("Failed to connect to the database");

//     println!("Connected to the database successfully!");

//     let cors = CorsLayer::new().allow_origin(Any);

//     let app = Router::new()
//         .route("/", get(root))
//         // Add database routes
//         .route("/users", get(get_users))
//         .route("/users", post(create_user))
//         .layer(Extension(pool))
//         .layer(cors);

//     let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
//     println!("listening on {}", addr);
    
//     axum::Server::bind(&addr)
//         .serve(app.into_make_service())
//         .await
//         .unwrap();
// }

// // Your existing root handler
// async fn root() -> impl IntoResponse {
//     let response = serde_json::json!({
//         "message": "Hello, World!",
//         "status": "success"
//     });
    
//     (StatusCode::OK, Json(response))
// }

// // Get all users
// async fn get_users(
//     Extension(pool): Extension<PgPool>
// ) -> Result<Json<Vec<User>>, (StatusCode, String)> {
//     let users = sqlx::query_as!(
//         User,
//         "SELECT id, name, email FROM users"
//     )
//     .fetch_all(&pool)
//     .await
//     .map_err(|e| {
//         (
//             StatusCode::INTERNAL_SERVER_ERROR,
//             format!("Database error: {}", e)
//         )
//     })?;

//     Ok(Json(users))
// }

// // Create a new user
// async fn create_user(
//     Extension(pool): Extension<PgPool>,
//     Json(user): Json<User>,
// ) -> Result<Json<User>, (StatusCode, String)> {
//     let new_user = sqlx::query_as!(
//         User,
//         "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
//         user.name,
//         user.email
//     )
//     .fetch_one(&pool)
//     .await
//     .map_err(|e| {
//         (
//             StatusCode::INTERNAL_SERVER_ERROR,
//             format!("Database error: {}", e)
//         )
//     })?;

//     Ok(Json(new_user))
// }

