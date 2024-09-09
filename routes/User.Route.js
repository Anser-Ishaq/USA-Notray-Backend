const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Auth.Middleware");
const {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserEmailAndName,
  updateUserPassword
} = require("../Controllers/User.Controller");

// @route   POST /api/v1/users/register
router.post("/register", registerUser);

// @route   GET /api/v1/users/getusers
router.get("/getusers", getUsers);

// @route   DELETE /api/v1/users/delete/:id
router.delete("/delete/:id", deleteUser);

// @route   UPDATE /api/v1/users/update/:id
router.post("/update/:id", updateUser);

// @route   PATCH /api/v1/users/updateUserEmailName/:id
router.patch("/updateUserEmailName/:id", updateUserEmailAndName);

// @route   PATCH /api/v1/users/:id/updateUserPassword
router.patch("/:id/updateUserPassword", updateUserPassword);

module.exports = router;
