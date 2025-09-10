const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", userController.getAllUsers);

// GET user by ID
router.get("/:id", userController.getUserById);

// POST create new user
router.post("/", userController.createUser);

// PUT update user
router.put("/:id", userController.updateUser);

// DELETE user
router.delete("/:id", userController.deleteUser);

module.exports = router;

const cors = require('cors');
app.use(cors({
  origin: 'http://temola.s3-website-us-east-1.amazonaws.com '
}));
