// models/userModel.js
const pool = require("../config/db");

class User {
  static async getAll() {
    try {
      const [rows] = await pool.execute("SELECT * FROM users ORDER BY id DESC");
      return rows;
    } catch (error) {
      console.error('Database error in getAll:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error('Database error in getById:', error);
      throw error;
    }
  }

  static async create(name, email, age) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age]
      );
      return { id: result.insertId, name, email, age };
    } catch (error) {
      console.error('Database error in create:', error);
      throw error;
    }
  }

  static async update(id, name, email, age) {
    try {
      const [result] = await pool.execute(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
        [name, email, age, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Database error in update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Database error in delete:', error);
      throw error;
    }
  }
}

module.exports = User;
