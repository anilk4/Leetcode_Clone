const Comment = require("../Database/comment");
const express = require('express');
const app = express.Router();

app.use(express.json()); 

app.post("/addComment", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.json({ message: 'Comment added' });
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

app.get("/getAllComment",async (req,res)=>{
    try{
       const comments =await Comment.find()
       return res.status(200).json({comments})
    }catch(error){
        return res.status(500).json({"message":"internal server error"})
    }
})

app.delete("/deleteComment/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findOne({ id: commentId });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await Comment.findOneAndDelete({ id: commentId });
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/updateComment/:commentId", async (req, res) => {
    try {
        const { commentId } = req.params;
        const text  = req.body.text;
        const comment = await Comment.findOne({ id: commentId });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.body = text;
        await comment.save();

        return res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = app;
