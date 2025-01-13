const express = require("express");
const {
  registerUserController,
  loginController,
} = require("../Controllers/registerController");

const router = express.Router();

//Register User
router.post("/register", registerUserController);

//login user
router.post("/login", loginController);

module.exports = router;
