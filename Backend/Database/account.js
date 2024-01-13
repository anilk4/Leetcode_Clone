const mongoose=require("mongoose");

const submissionsSchema=new mongoose.Schema({
  id:Number,
  language:String
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    submissions: [submissionsSchema],
    problems_solved_count: {
        type: Number,
        default: 0,
    },
    rank: Number,
  });

const User = mongoose.model('User',userSchema);
module.exports= User;