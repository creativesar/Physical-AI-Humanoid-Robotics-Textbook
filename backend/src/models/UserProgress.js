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

// UserProgress model
class UserProgress {
  static async create(userId, bookSectionId, progressPercentage) {
    const query = `
      INSERT INTO user_progress (id, user_id, book_section_id, progress_percentage) 
      VALUES (gen_random_uuid(), $1, $2, $3) 
      ON CONFLICT (user_id, book_section_id) 
      DO UPDATE SET progress_percentage = $3, updated_at = NOW()
      RETURNING *
    `;
    const values = [userId, bookSectionId, progressPercentage];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserIdAndSectionId(userId, bookSectionId) {
    const query = 'SELECT * FROM user_progress WHERE user_id = $1 AND book_section_id = $2';
    const result = await pool.query(query, [userId, bookSectionId]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async updateProgress(userId, bookSectionId, progressPercentage) {
    const query = `
      INSERT INTO user_progress (id, user_id, book_section_id, progress_percentage) 
      VALUES (gen_random_uuid(), $1, $2, $3) 
      ON CONFLICT (user_id, book_section_id) 
      DO UPDATE SET progress_percentage = $3, updated_at = NOW()
      RETURNING *
    `;
    const values = [userId, bookSectionId, progressPercentage];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = UserProgress;