const express = require("express");
const { verifyToken } = require("../Middlewares/authMiddleware");
const { mostBorrowedBookController, userBooksController } = require("../Controllers/analyticsController");



 const router = express.Router();

// most borrowed books
router.get("/most-borrowed",verifyToken,mostBorrowedBookController)

//most borrwod book with user
router.get("/most-borrow-user",verifyToken,userBooksController)
 

module.exports = router 