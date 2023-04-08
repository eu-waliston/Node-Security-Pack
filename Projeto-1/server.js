const connectDB = require("./config/db");

const express = require("express");
const app = express();
const PORT = 5000;


//Middlewares
app.use(express.json());

//Connecting the Database
connectDB();

//Routes
app.use("/api/auth", require("./Auth/Route"));

const server = app.listen(PORT, () => {
    console.log(`Server Connected to port ${PORT}`);
})


//Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1))
})

