const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/relationshipDemo")
  .then(() => {
    console.log("OPEN!!!");
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });
