const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected..');

    // Fetching food items
    const foodCollection = mongoose.connection.db.collection('food_items');
    const foodData = await foodCollection.find({}).toArray();
    // console.log('Food Data:', foodData);

    // Fetching categories
    const categoryCollection = mongoose.connection.db.collection('foodCatagory');
    const categoryData = await categoryCollection.find({}).toArray();
    // console.log('Category Data:', categoryData);

    return { foodData, categoryData };
  } catch (err) {
    console.error('Database not connected..', err);
    process.exit(1);
  }
};

module.exports = connectDB;
