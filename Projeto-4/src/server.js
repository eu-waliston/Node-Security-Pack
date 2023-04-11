const express = require("express");

const routes = require("./routes/index.route");

const cors = require("cors");
require('dotenv').config();

const api = express();


//Middlewares
api.use(express.json());
api.use(cors());


//Routes
api.use(routes);


api.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
})