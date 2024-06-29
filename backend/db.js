const mongoose = require("mongoose");
const mongoURI =
  "mongodb://foodify:PP553AV7bMGdJ6TR@ac-tmjweiy-shard-00-00.mj378yw.mongodb.net:27017,ac-tmjweiy-shard-00-01.mj378yw.mongodb.net:27017,ac-tmjweiy-shard-00-02.mj378yw.mongodb.net:27017/foodifyMern?ssl=true&replicaSet=atlas-dxmn9u-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mernCluster"; // Customer change url to your db you created in atlas
module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("database not connected.." + err);
    else {
      console.log("database connected..");
      try {
        const foodCollection = await mongoose.connection.db.collection(
          "food_items"
        );
        const foodData = await foodCollection.find({}).toArray();
        // console.log("Food Data:", foodData);

        const catagoryCollection = await mongoose.connection.db.collection(
          "foodCatagory"
        );
        const catagoryData = await catagoryCollection.find({}).toArray();
        // console.log("Category Data:", catagoryData);
        callback(null, foodData, catagoryData);
      } catch (error) {
        console.error("Error fetching data from collections:", error);
        callback(error, null, null);
      }
    }
  });
};
