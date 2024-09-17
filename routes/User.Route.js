const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Auth.Middleware");
const {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserEmailAndName,
  updateUserPassword,
  updateAllUsers,
  getOnlyNotaryUsers,
} = require("../Controllers/User.Controller");

// @route   POST /api/v1/users/register
router.post("/register", registerUser);

// @route   UPDATE /api/v1/users/update/:id
router.post("/update/:id", updateUser);

// @route   GET /api/v1/users/getusers
router.get("/getusers", getUsers);

// @route   GET /api/v1/users/getonlynotaryusers
router.get("/getonlynotaryusers", getOnlyNotaryUsers);

// @route   DELETE /api/v1/users/delete/:id
router.delete("/delete/:id", deleteUser);

// @route   PATCH /api/v1/users/updateUserEmailName/:id
router.patch("/updateUserEmailName/:id", updateUserEmailAndName);

// @route   PATCH /api/v1/users/:id/updateUserPassword
router.patch("/:id/updateUserPassword", updateUserPassword);

// @route   PATCH /api/v1/users/updateallusers
router.patch("/updateallusers", updateAllUsers);

module.exports = router;
