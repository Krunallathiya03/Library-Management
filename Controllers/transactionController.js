const bookModel = require("../Models/bookModel");
const transactionModel = require("../Models/transactionModel")

const borrowBookController = async(req,res)=>{
    try{
        const{ userId,bookId} = req.body
        // validation
        if(!userId || !bookId){
            res.status(400).json({message:"Please provide UserId Or BookId..."})
        }

        const book = await bookModel.findById(bookId)
        if(book.copiesAvailable <=0){
            res.status(400).json({message:"Book Not Available..."})
        }

        await transactionModel.create({userId,bookId})
      // console.log({userId,bookId})
         //console.log(book)
        book.copiesAvailable -= 1
        await book.save();

        res.status(200).json({ message: "Book borrowed successfully",book});
        

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in borrow Book Api....", error });
      }

}


const returnBookController = async (req,res)=>{
    try{
        const {transactionId} = req.body

        const transaction = await transactionModel.findById(transactionId)
        if(!transaction){
            return res.status(404).json({message:"Transaction not found..."})
        }

        transaction.status = "Returned"
        transaction.returnDate = new Date();

        await transaction.save();

        const book = await bookModel.findById(transaction.bookId)
       // console.log(transaction)
        book.copiesAvailable += 1
        await book.save();

        res.status(200).json({ message: "Book returned successfully",book });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in return Book Api....", error });
      }
}



module.exports = {borrowBookController,returnBookController}