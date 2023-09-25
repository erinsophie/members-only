const mongoose = require("mongoose");
require("dotenv").config({ path: "./env.development" });

const connectionStr = process.env.CONNECTION_STR;

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(connectionStr, {
      seNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1)
  }
};

module.exports = connectDB
