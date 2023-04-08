// var mongoose = require('mongoose');
// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';

// mongoose.connect(mongoDB, { useNewUrlParser: true });
//  //Get the default connection

// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Moongoose = require("mongoose");

const localDB = 'mongodb+srv://wesantosdev:4002892233513341@rest.gadbbad.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    await Moongoose.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log("MongoDB Connected");
}

module.exports = connectDB;
