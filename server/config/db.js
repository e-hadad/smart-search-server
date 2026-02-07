import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'smart_drive_db',
    password: process.env.DB_PASSWORD, // הסיסמה שלך מההתקנה
    port: process.env.DB_PORT || 5432,
});

export default pool;