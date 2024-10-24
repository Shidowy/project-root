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
