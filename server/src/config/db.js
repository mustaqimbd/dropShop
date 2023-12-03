const mongoose = require("mongoose");
const { dBURL } = require("../secret");

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(dBURL);
    console.log("Database is connected successfully.");
    mongoose.connection.on("error", error => {
      console.error(`DB connection error ${error}`);
    });
  } catch (error) {
    console.log(`Could not connect to db ${error.toString()}`);
  }
};

module.exports = connectDB;
