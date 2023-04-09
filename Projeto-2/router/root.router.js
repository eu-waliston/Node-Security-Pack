const express = require("express");
const User = require("../model/user");

const userRouter = express.Router();

userRouter.get("/register", async (req,res) => {
    try {
        //get user input
        const {firstame, lastName, email, password} = req.body;

        //validate user input
        if(!(email && password && firstame && lastName)) {
            res.status(400).send("All input is required");
        }

        //check if user already exist
        //Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if(oldUser) {
            return res.status(409).send("User Already Exist. Please Login")
        }

        //Encrypt user password
        encrypedUsserPasword = await bcrypt.hash(password, 10);

        //creatae user in our database
        const user = await User.create({

        })

    } catch (err) {

    }
})

userRouter.get("/login", (req,res) => {
    res.status(200).send("Login Page")
})

module.exports = userRouter;
