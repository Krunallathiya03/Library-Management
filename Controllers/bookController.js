const bookModel = require("../Models/bookModel");

//add book
const addBookController = async (req, res) => {
  try {
   
    const { title, author, category,  copiesAvailable } = req.body;
    const totalCopies =copiesAvailable;

    const book = new bookModel({
      title,
      author,
      category,
      copiesAvailable,
      totalCopies,
    });
    await book.save();
    res.status(201).json({ messaage: "Book Add Sucessfully....", book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Add Book Api....", error });
  }
};

//get all book

const getAllBookcontroller = async (req, res) => {
  try {
    const getBook = await bookModel.find();
    res.status(200).json({ totalBooks: getBook.length , getBook});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in get all  Book Api....", error });
  }
};

//update book
const updateBookController = async (req, res) => {
  try {
    const Id = req.params.id;

    const book = await bookModel.findById(Id);
    if (!book) {
      return res.status(404).send({ messaeg: "No Book Found" });
    }

    const updateBook = await bookModel.findByIdAndUpdate(Id, req.body, {new: true});
    res.status(200).send({ message: "Updated book...", updateBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in update Book Api....", error });
  }
};

//delete book
const deleteBookController = async (req, res) => {
  try {
    const Id = req.params.id;

    const book = await bookModel.findById(Id);
    if (!book) {
      return res.status(404).send({ messaeg: "No Book Found" });
    }

    const deleteBook = await bookModel.findByIdAndDelete(Id);
    res.status(200).send({ message: "Deleted book...", deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in delete Book Api....", error });
  }
};

module.exports = {
  addBookController,
  getAllBookcontroller,
  updateBookController,
  deleteBookController,
};
