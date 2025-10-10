import pool from '../db/connection.js';

export class User {
  static async create(username) {
    const query = `
      INSERT INTO users (username)
      VALUES ($1)
      RETURNING *
    `;
    
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }
}

export default User;