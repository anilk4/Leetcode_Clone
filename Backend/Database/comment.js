const mongoose=require("mongoose");
try{
    mongoose.connect(
        "mongodb+srv://anilkumarkclk:1AY18ec%4010@cluster0.rzxbmn9.mongodb.net/Leetcode"
      );
}catch(err){
    console.log(err);
}
const CommentSchema = new mongoose.Schema({
    id: String,
    body: String,
    parentId: String,
    userId: String,
    userName:String,
    createdDate:Date
})

const Comment = mongoose.model("Comment",CommentSchema)
module.exports = Comment