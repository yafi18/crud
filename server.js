const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server berjalan di http://0.0.0.0:${port}`);
});
