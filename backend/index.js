const express = require("express");
const connectDB = require('./db.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;

// Initialize global variables for food data and categories
let globalFoodData;
let globalFoodCategory;

// Connect to the database
connectDB()
  .then(({ foodData, categoryData }) => {
    globalFoodData = foodData;
    globalFoodCategory = categoryData;
  })
  .catch(err => console.error('Error initializing app:', err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/auth", require("./Routes/Auth"));

app.post("/api/foodData", (req, res) => {
  try {
    res.send([globalFoodData, globalFoodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
