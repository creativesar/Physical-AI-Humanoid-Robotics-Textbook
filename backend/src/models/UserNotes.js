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

// UserNotes model
class UserNotes {
  static async create(userId, bookSectionId, noteContent, position) {
    const query = `
      INSERT INTO user_notes (id, user_id, book_section_id, note_content, position) 
      VALUES (gen_random_uuid(), $1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [userId, bookSectionId, noteContent, position];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT un.*, bc.title as section_title 
      FROM user_notes un
      JOIN book_content bc ON un.book_section_id = bc.id
      WHERE un.user_id = $1 
      ORDER BY un.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findByUserIdAndSectionId(userId, bookSectionId) {
    const query = 'SELECT * FROM user_notes WHERE user_id = $1 AND book_section_id = $2 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId, bookSectionId]);
    return result.rows;
  }

  static async findById(id, userId) {
    const query = 'SELECT * FROM user_notes WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async updateById(id, userId, noteContent) {
    const query = 'UPDATE user_notes SET note_content = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING *';
    const result = await pool.query(query, [noteContent, id, userId]);
    return result.rows[0];
  }

  static async deleteById(id, userId) {
    const query = 'DELETE FROM user_notes WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }
}

module.exports = UserNotes;