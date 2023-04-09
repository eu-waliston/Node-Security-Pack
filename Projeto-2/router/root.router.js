const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const cors = require("cors")

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    //get user input
    const { firstName, lastName, email, password } = req.body;

    //validate user input
    if (!email && !password && !firstName && !lastName) {
      res.status(400).send("All inputs is required 😠");
    }

    //check if user already exist
    //validate if user exist in our DB
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist 🤔. Please Login😛");
    }

    //encrypt password
    const encryptedUserPassword = await bcrypt.hash(password, 10);

    //create user in our DB
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });

    //create a token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    //save user token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    //get user input
    const { email, password } = req.body;

    //validate user input
    if (!email && !password) {
      res.status(400).send("All input is required 😠");
    }

    //validate if user exist in our DB
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //create a token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "5h" }
      );

      //save user token
      user.token = token;

      //user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credencials");
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/welcome",cors(), auth, (req, res) => {
  res.status(200).send("Welcome! 👐");
});

module.exports = userRouter;
