// src/database.rs
use sqlx::sqlite::SqlitePool;

pub async fn establish_connection() -> SqlitePool {
    let pool = SqlitePool::connect("sqlite://my_database.db").await.unwrap();
    pool
}