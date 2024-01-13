const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const User =require("./db/user");

const { generateFile } = require("./generateFile");


const Job = require("./models/job");
const { addJobToQueue } = require("./jobQueue");
const Test = require("./db/testDB");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function dbConnection() {
  const dbURL = process.env.DB_URL
  try {
    await mongoose.connect(
      dbURL
    );
    console.log("db connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
dbConnection();

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.post("/run/:username", async (req, res) => {
  const { language = "java", code, problem_id,output } = req.body;
  const username=req.username;
  console.log(language);
  console.log(code);
  if (code === undefined || code.length <= 0) {
    return res.status(500).json({ success: "false", error: "code is empty" });
  }

    const filepath = await generateFile(language, code);

    const job = await new Job({ language, filepath }).save();
    if (job === undefined) {
      throw Error(`cannot find Job with id ${jobId}`);
    }
    const jobId = job["_id"];
    addJobToQueue(jobId,username,problem_id);
    console.log("job: ", job);
    
    const jobObject=Job.findById(jobId);
    const user=User.findOne({username:username});
    if(output==="hello"){
      const newUser={
        submissions:{
          id:problem_id,
          code:{
            language:code
          }
        },
        problems_solved_count:user.problems_solved_count+1
      }

      const user=User.findOneAndUpdate({username:req.params.username},newUser,{new:true});
    }
    res.status(201).json({ jobId });
});


app.get("/getProblem",async(req,res)=>{
  const username=req.body.username;
  const problem_id=req.body.id;
  const user=User.findOne({username:username});
  if(!user){
    res.status(404).send("at this username code is not found");
  }
  else{
    res.status(200).send(user);
  }

});

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const job = await Job.findById(jobId);

  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }
  return res.status(200).json({ success: true, job });
});

app.get('/data', async (req, res) => {
  try {
      const result = await Test.findOne({ result_id: 1 });

      return res.json(result);
  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      return res.status(500).send('Internal Server Error');
    }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});



