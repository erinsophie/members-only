const mongoose = require("mongoose");
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
require("dotenv").config({ path: envFile });

const connectionStr = process.env.CONNECTION_STR;

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
