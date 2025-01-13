const express = require("express");
const {
  addBookController,
  getAllBookcontroller,
  updateBookController,
  deleteBookController,
} = require("../Controllers/bookController");
const { verifyToken, isadmin } = require("../Middlewares/authMiddleware");

const route = express.Router();

//add book
route.post("/add",verifyToken,isadmin, addBookController);

//get all book
route.get("/",verifyToken, getAllBookcontroller);

//update book
route.put("/update/:id",verifyToken,isadmin, updateBookController);

//delete book
route.delete("/delete/:id",verifyToken,isadmin, deleteBookController);

module.exports = route;
