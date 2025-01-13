const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userModel = require("../Models/userModel");

// Register User
const registerUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validation
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please provide all fields" });
    }

    //check user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      res.status(400).json({ message: "you are already registred...." });
    }

    //hash Password
    const hash = await bcrypt.hash(password, 10);

    //create user
    const user = await userModel.create({
      name,
      email,
      password: hash,
      role,
    });
    await user.save();
    res.status(201).send({ message: "User Registerd Sucessfully....", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in regester Api....", error });
  }
};

//login user
const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;

    //validation
    if (!name || !password) {
      return res.status(400).json({ message: "Please provide all fields..." });
    }

    //check user
    const user = await userModel.findOne({ name });
    if (!user) {
      res.status(400).json({ message: "User not found   " });
    }

    //compare password
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Your password are not matched" });
    }

    //token
    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN
    );
    res.status(200).send({ message: "login sucessfully....", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in regester Api....", error });
  }
};

module.exports = { registerUserController, loginController };
