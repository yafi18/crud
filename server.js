// server.js

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const path = require('path'); // Tambahkan ini

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Untuk parsing body JSON

// Tambahkan ini untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rute API
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  // Sekarang, rute root akan melayani index.html dari folder public
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});