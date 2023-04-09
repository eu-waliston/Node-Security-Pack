require("dotenv").config();
const connectDB = require("./config/database");
const userRouter = require("./router/root.router");

const express = require("express");

const app = express();

//middlewares
app.use(express.json());

//logic goes here

//Connecting the Database
connectDB();

//router
app.use("/", userRouter)

module.exports = app;
