const express = require("express");
const { Problems } = require("../Database/problemsDB");
const app = express();
const z=require('zod');
const jwt=require('jsonwebtoken');
const SECRET = require('../middleware/auth')
const User = require("../Database/account");
const { authenticateJwt } = require("../middleware/auth");
const axios = require('axios');

const codeInp=z.object({
  username:z.string(),
  problem_id: z.number(),
  code: z.string(),
  language: z.string(),
  output: z.string()
})

app.get('/getAll', async(req, res) => {
    try {
        const course = await Problems.find();
        return res.status(200).json({course})
    } catch (error) {
        return res.status(500).json({"message":"internal server error"})
    }
});

app.post('/code', async(req, res) => {
  
    let parsedInput=codeInp.safeParse(req.body);

    // if(!parsedInput.success){
    //   return res.status(403).json({
    //     msg:"Parsing Error"
    //   });
    // }
    const username=parsedInput.data.username;
    const language=parsedInput.data.language;
    const code = parsedInput.data.code;
    const problem_id = parsedInput.data.problem_id;
    const output = parsedInput.data.output;

    // const user = await User.findOne({ username: req.user.username });
    // if (!user) {
    //   res.status(403).json({msg: "User doesnt exist"})
    //   return
    // }

    const dataToSend = {
      username,
      language,
      code,
      problem_id,
      output,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/run', dataToSend);
      console.log('Response from backend (b):', response.data);
  
      // Handle the response as needed
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error sending data to compiler backend:', error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }

    console.log(username +" "+ language +" "+ problem_id + " " + code + " Expected output :" + output);
})

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