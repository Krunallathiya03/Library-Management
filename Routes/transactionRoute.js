const express = require("express");
const { borrowBookController, returnBookController } = require("../Controllers/transactionController");
const { verifyToken } = require("../Middlewares/authMiddleware");

const route = express.Router();

//borrow book || issue book
route.post("/borrow",verifyToken,borrowBookController)

// return book
route.post("/return",verifyToken,returnBookController)

module.exports = route