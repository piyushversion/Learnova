const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {

  try {

    await mongoose.connect(process.env.dburl);

    console.log('DB connection SUCCESS');

  } catch (error) {

    console.error('DB connection FAIL',error);
    process.exit(1);

  }
}

module.exports = connectDB;