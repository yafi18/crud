// models/userModel.js
const pool = require('../config/db');

class User {
  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(name, email, age) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );
    return { id: result.insertId, name, email, age };
  }

  static async update(id, name, email, age) {
    const [result] = await pool.execute(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = User;