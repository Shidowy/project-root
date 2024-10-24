// src/database.rs
use sqlx::PgPool;
use std::env;

pub async fn establish_connection() -> PgPool {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to the database")
}

pub async fn log_user_signup(
    pool: &PgPool,
    name: &str,
    email: &str,
    password: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3)"#,
        name,
        email,
        password  // In a production environment, ensure this is hashed!
    )
    .execute(pool)
    .await?;
    Ok(())
}