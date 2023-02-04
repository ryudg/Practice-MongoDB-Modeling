const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }], // products 필드가 MongoDB ObjectId의 배열이어야 함을 지정
  // type 속성은 Schema.Types.ObjectId로 설정되어 Mongoose에게이 필드가 MongoDB 문서의 고유 식별자를 저장할 것임을 알림.
  // ref 속성은 "Product"로 설정되어 ObjectId 값을 결정할 때 Mongoose가 Product 컬렉션을 참조하도록 지정
});

const Farm = mongoose.model("Farm", farmSchema);

const Product = mongoose.model("Product", productSchema);
// Product.insertMany([
//   { name: "Goddes Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Watermelo", price: 5.99, season: "Summer" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//   const melon = await Product.findOne({ name: "Goddes Melon" });
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };
// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelo = await Product.findOne({ name: "Sugar Watermelo" });
  farm.products.push(watermelo);
  await farm.save();
  console.log(farm);
};
addProduct();
