const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/register", (req, res) => {
  res.status(200).send("Register Page");
});

userRouter.post("/register", async (req, res) => {
  try {
    //get user input
    const { firstName, lastName, email, password } = req.body;

    //validate user input
    if(!email && !password && !firstName && !lastName) {
        res.status(400).send("All inputs is required 😠");
    }

    //check if user already exist
    //validate if user exist in our DB
    const oldUser = await User.findOne({ email });
    if(oldUser) {
        return res.status(409).send("User Already Exist 🤔. Please Login😛")
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
        { user_id: user._id, email},
        process.env.TOKEN_KEY,
        {
            expiresIn: "5h"
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

userRouter.get("/login", (req, res) => {
  res.status(200).send("Login Page");
});

module.exports = userRouter;
