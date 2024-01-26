const express = require("express");
const { Problems } = require("../Database/problemsDB");
const app = express.Router();
const z=require('zod');
const jwt=require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");
const User = require("../Database/account");

const loginInput=z.object({
    username:z.string(),
    password:z.string()
  });
  const signUpInput=z.object({
      name:z.string(),
      username:z.string(),
      password:z.string()
  })

  app.get("/me", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      res.status(403).json({msg: "User doesnt exist"})
      return
    }
    res.json({
        username: user.username
    })
});

app.get("/profile",authenticateJwt,  async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  console.log(user)
  if (!user) {
    res.status(403).json({msg : "Invalid User"});
    return
  }
  res.json({user})
  console.log(user)
})

  app.post('/signup',async (req,res)=>{
    // console.log(req.body);
    let parsedInput=signUpInput.safeParse(req.body);
    if(!parsedInput.success){
      return res.status(403).json({
        msg:"Parsing Error"
      });
    }
    const username=parsedInput.data.username;
    const password=parsedInput.data.password;
    const name=parsedInput.data.name;
    const user = await User.findOne({username,password});
    console.log(username+" "+password+" "+name);
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const obj={username:username,password:password,name:name};
      const newUser = new User(obj);
      newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});

app.post('/login', async(req,res)=>{
    let parsedInput=loginInput.safeParse(req.body);
        if(!parsedInput.success){
          return res.status(403).json({
              msg:"Parsing Error"
          });
        }
        const username=parsedInput.data.username;
        const password=parsedInput.data.password;
        const user = await User.findOne({username,password});
        console.log(SECRET);
        if (user){
            const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        } else{
            res.status(403).json({ message: 'Invalid username or password' });
        }
})

module.exports = app;
