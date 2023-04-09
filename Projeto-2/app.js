require("dotenv").config();
const connectDB = require("./config/database");
const userRouter = require("./router/root.router");
const cors = require("cors")


const express = require("express");

const app = express();

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors())

//logic goes here

//Connecting the Database
connectDB();

//router
app.use("/", userRouter)

module.exports = app;
