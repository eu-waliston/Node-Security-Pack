require("dotenv").config();
const Moongoose = require("mongoose");

const connectDB = async () => {
    await Moongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log("MongoDB Connected");
}

module.exports = connectDB;