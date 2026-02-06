const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbHOST = process.env.DBHOST;

const connectDB = () => {
  mongoose.set("strictQuery", false);
  // Fix the 'buffering timed out' error by disabling buffering
  mongoose.set("bufferCommands", false);

  return mongoose.connect(dbHOST, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
    .then(() => {
      console.log('MongoDB Connected...');
    }).catch((err) => {
      console.log('Error while Mongo Conn..', err);
      process.exit(1); // Exit if connection fails
    });
};

module.exports = connectDB;
