const mongoose = require("mongoose");

try{
    mongoose.connect(
        "mongodb+srv://anilkumarkclk:1AY18ec%4010@cluster0.rzxbmn9.mongodb.net/Leetcode"
      );
}catch(err){
    console.log(err);
}

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  difficulty: String,
  acceptance_rate: String,
  companies: String,
  related_topics: String,
});

const problemSchema = new mongoose.Schema({
  main: {
      id: Number,
      title: String,
      description: String,
      difficulty: String,
      acceptance_rate: Number,
      companies:String,
      related_topics:String,
  },
  test: Array,
});


const Problems = mongoose.model("Test", ProblemSchema, "Test");

module.exports = {
  Problems,
};

