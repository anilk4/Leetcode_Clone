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

module.exports = app;
