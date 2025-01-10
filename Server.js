const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./Config/db");

const app = express();
dotenv.config();

//Database Connection
connectDB();

//middelwares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes
app.use("/auth",require("./Routes/authRoute"))
app.use("/book",require("./Routes/bookRoute"))

//port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))