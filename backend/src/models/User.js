const { Pool } = require('pg');
require('dotenv').config();

// Database connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'physics_ai_book',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// User model
class User {
  static async create(userData) {
    const { email, password, name } = userData;
    const query = `
      INSERT INTO users (id, email, password, name, email_verification_token) 
      VALUES (gen_random_uuid(), $1, $2, $3, $4) 
      RETURNING id, email, name, created_at
    `;
    const values = [email, password, name, userData.emailVerificationToken];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, name, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updatePassword(id, newPassword) {
    const query = 'UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2';
    await pool.query(query, [newPassword, id]);
  }

  static async verifyEmail(token) {
    const query = 'UPDATE users SET email_verified = true, email_verification_token = NULL WHERE email_verification_token = $1';
    await pool.query(query, [token]);
  }

  static async setResetPasswordToken(email, token, expires) {
    const query = 'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE email = $3';
    await pool.query(query, [token, expires, email]);
  }

  static async findByResetToken(token) {
    const query = 'SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()';
    const result = await pool.query(query, [token]);
    return result.rows[0];
  }
}

module.exports = User;