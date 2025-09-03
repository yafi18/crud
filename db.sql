-- Membuat database
CREATE DATABASE IF NOT EXISTS testdb;

-- Menggunakan database
USE testdb;

-- Membuat tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT
);
