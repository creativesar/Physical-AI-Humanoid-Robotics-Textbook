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

// ChatHistory model
class ChatHistory {
  static async create(userId, message, response, context = null) {
    const query = `
      INSERT INTO chat_history (id, user_id, message, response, context_used)
      VALUES (gen_random_uuid(), $1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, message, response, context];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId, limit = 50, offset = 0) {
    const query = `
      SELECT id, message, response, created_at
      FROM chat_history
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [userId, limit, offset]);
    return result.rows;
  }

  static async deleteById(id, userId) {
    const query = 'DELETE FROM chat_history WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }

  static async deleteAllByUserId(userId) {
    const query = 'DELETE FROM chat_history WHERE user_id = $1';
    await pool.query(query, [userId]);
  }
}

module.exports = ChatHistory;