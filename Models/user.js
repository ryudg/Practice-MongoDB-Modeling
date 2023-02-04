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

// 유저 스키마 정의
const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { _id: false }, // mongoose _id 생성 막기
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// 유저 생성
const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });
  u.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

// 새 주소 추가
const addAdress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

// makeUser(); 유저 추가
addAdress("63de46fd13cdf0df1499bfab"); // id를 찾은 후 새 주소 추가
