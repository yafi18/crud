# nodejs-crud-simple

Project ini merupakan implementasi sederhana dari aplikasi CRUD (Create, Read, Update, Delete) menggunakan **Node.js** dengan koneksi ke **MySQL**.

## Database
Buat database misal dengan nama testdb dan buat tabel user dengan struktur berikut ini:
```bash
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT
);
```

## File .env
Berikut contoh file .env yang digunakan
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=testdb
PORT=3000
```

## Menjalankan Aplikasi
untuk menjalankan aplikasi ini
```bash
npm install
npm start
```

Kemudian perhatikan alamat server running di mana, misalnya:

Server berjalan di http://localhost:3000


Maka cara mengaksesnya menggunakan browser di alamat ini:
```bash
http://localhost:3000
```
## License

[MIT](https://choosealicense.com/licenses/mit/)