use axum::{Router, Extension};
use hyper::Server; // Import from hyper
use sqlx::PgPool;
use std::net::SocketAddr;
use dotenvy::dotenv; // Correct import for dotenvy
use std::env;

#[tokio::main]
async fn main() {
    dotenv().ok(); // Load environment variables from .env file

    // Get the database URL from the environment
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Connect to the PostgreSQL database
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to the database");

    println!("Connected to the database successfully!"); // Add this line for database connection feedback

    // Create the Axum application
    let app = Router::new()
        .route("/", axum::routing::get(handler))
        .layer(Extension(pool));

    // Define the server address
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    // Start the server
    println!("Listening on http://{}", addr); // Add this line for server feedback
    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// Sample handler function
async fn handler(Extension(_pool): Extension<PgPool>) -> &'static str {
    "Hello, world!"
}
