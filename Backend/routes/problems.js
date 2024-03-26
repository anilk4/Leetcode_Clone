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
    console.log("inside /code");
    // const { username, language, code, problem_id, output } = req.body;
    // console.log(typeof username)
    // console.log(typeof language)
    // console.log(typeof code)
    // console.log(typeof problem_id)
    // console.log(typeof output)

    const parsedInput = codeInp.safeParse(req.body);
    console.log(parsedInput);

    if (!parsedInput.success) {
      return res.status(403).json({
        msg: 'Parsing Error',
      });
    }
    console.log(parsedInput);
    const { username, language, code, problem_id, output } = parsedInput.data;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(403).json({ msg: 'User does not exist' });
    }

    const dataToSend = { username, language, code, problem_id, output };

    const response = await axios.post('http://localhost:5000/run', dataToSend);

    console.log('Response from backend (b):', response.data);

    
    let updatedUser
    let newUser

    if (response.data.output === true) {
      const submissionId = response.data.problem_id;
      const language = response.data.language;
    
      // Check if the submission with the given id already exists for the user
      const existingUser = await User.findOne({ username, 'submissions.id': submissionId });
    
      if (existingUser) {
        // If submission exists, find the correct submission
        const submissionIndex = existingUser.submissions.findIndex(submission => submission.id === submissionId);
      
        if (submissionIndex !== -1) {
          // Submission found, check and update/add language code
          const existingLanguageCode = existingUser.submissions[submissionIndex].code[language];
      
          // Update the language code, whether it exists or not
          const update = {
            [`submissions.${submissionIndex}.code.${language}`]: code,
          };
      
          console.log(existingLanguageCode ? "Updating" : "Adding", "language code");
      
          updatedUser = await User.findOneAndUpdate(
            { username, 'submissions.id': submissionId },
            { $set: update },
            { new: true }
          );
        }
      } else {
        // If submission doesn't exist, add a new submission with the language code
        console.log("Problem submission doesn't exist, adding");
        newUser = await User.findOneAndUpdate(
          { username },
          { $push: { submissions: { id: submissionId, code: { [language]: code } } } },
          { new: true }
        );
      }
      
    }
    


      if (updatedUser || newUser) {
        return res.json({ data : response.data, msg: "user submitted code successfully" });
      } else {
        return res.json({ data : response.data, msg: "compilation error" });
      }
    
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