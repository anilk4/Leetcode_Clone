const express = require("express");
const { Problems } = require("../Database/problemsDB");
const app = express();
const z=require('zod');
const jwt=require('jsonwebtoken');
const SECRET = require('../middleware/auth')
const User = require("../Database/account");




app.get('/getAll', async(req, res) => {
    try {
        const course = await Problems.find();
        return res.status(200).json({course})
    } catch (error) {
        return res.status(500).json({"message":"internal server error"})
    }
});

module.exports = app;