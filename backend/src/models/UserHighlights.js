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

// UserHighlights model
class UserHighlights {
  static async create(userId, bookSectionId, highlightedText, positionStart, positionEnd) {
    const query = `
      INSERT INTO user_highlights (id, user_id, book_section_id, highlighted_text, position_start, position_end) 
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [userId, bookSectionId, highlightedText, positionStart, positionEnd];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT uh.*, bc.title as section_title 
      FROM user_highlights uh
      JOIN book_content bc ON uh.book_section_id = bc.id
      WHERE uh.user_id = $1 
      ORDER BY uh.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findByUserIdAndSectionId(userId, bookSectionId) {
    const query = 'SELECT * FROM user_highlights WHERE user_id = $1 AND book_section_id = $2 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId, bookSectionId]);
    return result.rows;
  }

  static async deleteById(id, userId) {
    const query = 'DELETE FROM user_highlights WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }

  static async deleteBySectionId(userId, bookSectionId) {
    const query = 'DELETE FROM user_highlights WHERE user_id = $1 AND book_section_id = $2';
    await pool.query(query, [userId, bookSectionId]);
  }
}

module.exports = UserHighlights;