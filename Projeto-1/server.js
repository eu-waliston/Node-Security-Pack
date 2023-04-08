const connectDB = require("./config/db");

const express = require("express");
const app = express();
const PORT = 5000;
const cookieParser = require("cookie-parser");

const {adminAuth, userAuth} = require("./middleware/auth.js");

//Middlewares
app.use(express.json());
app.use(cookieParser());


//Connecting the Database
connectDB();

//Routes
app.use("/api/auth", require("./Auth/Route"));
app.get("/admin", adminAuth, (req,res) => res.send("Admin Route"))
app.get("/basic", userAuth, (req,res) => res.send("User Route"))


const server = app.listen(PORT, () => {
    console.log(`Server Connected to port ${PORT}`);
})


//Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1))
})

