const express = require("express");
const rootRouter = require("./routes/index.route");
const cors = require("cors");
require('dotenv').config();

const api = express();


//Middlewares
api.use(express.json());
api.use(cors());


//Routes
api.use('/', rootRouter);


api.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
})