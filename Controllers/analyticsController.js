const transactionModel = require("../Models/transactionModel")


//most borrowed books

const mostBorrowedBookController = async(req,res)=>{
    try{
        const mostBorrowed =  await transactionModel.aggregate([
            
                {
                  $match: {
                    status: "Borrowed"
                  }
                },
                {
                  $group: {
                    _id: "$bookId",
                    borrowCount: {
                      $sum: 1
                    }
                  }
                },
                {
                  $sort: {
                    borrowCount: -1
                  }
                },
                {
                  $limit: 5
                }
              
        ])
        res.status(200).json(mostBorrowed)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in most borrowed books  Api....", error })
    }
}

// user with most borred books

const userBooksController = async (req,res)=>{
    try{
        const userBorrowed = await transactionModel.aggregate(
            [
                {
                  $group: {
                    _id: "$userId",
                    borrowCount: { $sum: 1 }
                  }
                },
                {
                  $sort: {
                    borrowCount: -1
                  }
                },
                {
                  $limit: 5
                }
              ]
        )
        res.status(200).json(userBorrowed)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in user with most borrowed books  Api....", error })
    }
}

module.exports = {mostBorrowedBookController,userBooksController}
