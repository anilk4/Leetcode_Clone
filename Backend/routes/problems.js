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
        const problems = await Problems.find();
        return res.status(200).json({problems})
    } catch (error) {
        return res.status(500).json({"message":"internal server error"})
    }
});

app.post('/code', authenticateJwt, async (req, res) => {
  try {
    const parsedInput = codeInp.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(403).json({
        msg: 'Parsing Error',
      });
    }

    const { username, language, code, problem_id, output } = parsedInput.data;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(403).json({ msg: 'User does not exist' });
    }

    const dataToSend = { username, language, code, problem_id, output };

    const response = await axios.post('http://localhost:5000/run', dataToSend);

    console.log('Response from backend (b):', response.data);

    if (response.data.output === true) {
      const newCode = {
        submissions: {
          id: response.data.problem_id,
          code: {
            [response.data.language]: code,
          },
        },
      };

      const updatedUser = await User.findOneAndUpdate(
        { username },
        newCode,
        { new: true }
      );

      if (updatedUser) {
        return res.json({ message: 'User updated successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error processing data in frontend:', error.message);
    return res.status(500).json({ msg: 'Internal Server Error' });
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