// server.js
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// Rute API
app.use("/users", userRoutes);

// Rute root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Jalankan server di 0.0.0.0 agar bisa diakses dari luar
app.listen(port, "0.0.0.0", () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});
