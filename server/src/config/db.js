const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async (option = {}) => {
  try {
    await mongoose.connect(config.db.url);
    console.log("Database is connected successfully.");
    mongoose.connection.on("error", error => {
      console.error(`DB connection error ${error}`);
    });
  } catch (error) {
    console.log(`Could not connect to db ${error.toString()}`);
  }
};

module.exports = connectDB;
