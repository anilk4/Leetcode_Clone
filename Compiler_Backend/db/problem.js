const mongoose = require("mongoose");

try{
    mongoose.connect(
        "mongodb+srv://anilkumarkclk:1AY18ec%4010@cluster0.rzxbmn9.mongodb.net/Leetcode"
      );
}catch(err){
    console.log(err);
}

const TestcaseSchema=new mongoose.Schema({
    code:{
        java:{
            type:String,
            default:null
        },
        cpp:{
            type:String,
            default:null
        },
        py:{
            type:String,
            default:null
        },
        js:{
            type:String,
            default:null
        }
      },
    output:{

    }
})
const ProblemSchema = new mongoose.Schema({
  main: {
      id: Number,
      title: String,
      description: String,
      difficulty: String,
      acceptance_rate: Number,
      companies:String,
      related_topics:String,
  },
  testcase: [TestcaseSchema],
});


const Problems = mongoose.model("Test", ProblemSchema, "Test");

module.exports = {
  Problems,
};

