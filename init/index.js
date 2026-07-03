const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

// delete all the existing data and insert the new data from data.json 
const initDB = async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data); // insertMany is used to insert multiple documents at once in data.js file we will call this function to initialize the database with the data from data.json, where export is in object form
    console.log("data was initialized");
}

initDB(); // call the function to initialize the database with the data from data.json

