const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET semua user
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tambah user
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    await pool.query("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", [
      name,
      email,
      age,
    ]);
    res.json({ message: "User berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    await pool.query("UPDATE users SET name=?, email=?, age=? WHERE id=?", [
      name,
      email,
      age,
      id,
    ]);
    res.json({ message: "User berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "User berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
