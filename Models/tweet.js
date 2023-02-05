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

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   // const user = new User({ username: "Son", age: 30 });
//   const user = await User.findOne({ username: "Son" });
//   // const tweet1 = new Tweet({ text: "OMG!!!!", likes: 321 });
//   const tweet2 = new Tweet({ text: "WIN!!!!!!!!!", likes: 9999 });
//   // tweet1.user = user;
//   tweet2.user = user;
//   user.save();
//   // tweet1.save();
//   tweet2.save();
// };
// makeTweets();

const findTweet = async () => {
  const t = await Tweet.find({}).populate("user", "username");
  console.log(t);
};
findTweet();

// mongo
// > use relationshipDemo
// switched to db relationshipDemo
// > show collections
// farms
// products
// tweets
// users
// > db.tweets.find().pretty()
// ## tweet1 추가
// {
//         "_id" : ObjectId("63df1f3af3878d48ce45e740"),
//         "text" : "OMG!!!!",
//         "likes" : 321,
//         "user" : ObjectId("63df1f3af3878d48ce45e73f"),
//         "__v" : 0
// }
// > db.tweets.find().pretty()
// ## tweet2 추가
// {
//         "_id" : ObjectId("63df1f3af3878d48ce45e740"),
//         "text" : "OMG!!!!",
//         "likes" : 321,
//         "user" : ObjectId("63df1f3af3878d48ce45e73f"),
//         "__v" : 0
// }
// {
//         "_id" : ObjectId("63df2013551f854fb7740813"),
//         "text" : "WIN!!!!!!!!!",
//         "likes" : 9999,
//         "user" : ObjectId("63df1f3af3878d48ce45e73f"),
//         "__v" : 0
// }
