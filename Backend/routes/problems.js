const express = require("express");
const { Problems } = require("../Database/problemsDB");
const app = express();
const {authenticateJwt} =require("../middleware/auth");
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

app.put('/getUser/:username',async (req,res)=>{
    const newUser=req.body;

      const user= await User.findOneAndReplace({username:req.params.username},newUser,{new:true});
    //   console.log(user);
      if(user){
        const userSend=user.submissions;
        res.status(200).json({user:userSend});
      }
      else{
        res.status(404).send("user not found");
      }
});

module.exports = app;