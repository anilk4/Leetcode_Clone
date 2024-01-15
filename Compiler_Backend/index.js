const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

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

// app.post("/run", async (req, res) => {
//   const { language, code } = req.body;
//   console.log(language);
//   console.log(code);

//   if (code === undefined || code.length <= 0) {
//     return res.status(500).json({ success: "false", error: "code is empty" });
//   }

//     const filepath = await generateFile(language, code);

//     const job = await new Job({ language, filepath }).save();
//     if (job === undefined) {
//       throw Error(`cannot find Job with id ${jobId}`);
//     }
//     const jobId = job["_id"]; //filepath and language stored in mongodb hence, fetching job[_id] from mongodb
//     addJobToQueue(jobId);
//     console.log("job: ", job);

    

//     res.status(201).json({ jobId });
 
// });

app.post("/run", async (req, res) => {
  const { username, language, code, problem_id, output } = req.body;

  try {
  if (code === undefined || code.length <= 0) {
    return res.status(500).json({ success: "false", error: "code is empty" });
  }

    const filepath = await generateFile(language, code);

    const job = await new Job({ language, filepath }).save();
    if (job === undefined) {
      throw Error(`cannot find Job with id ${jobId}`);
    }
    const jobId = job["_id"];
    addJobToQueue(jobId);
    console.log("job: ", job);
    
    const jobObject=Job.findById(jobId);

    console.log(output+" "+ jobObject.output);

    let json = {}

    if(output == jobObject.output){
      let json = {
        username: username,
        problem_id: problem_id,
        language: language,
        output: true
      }
    } else {
      let json = {
        username: username,
        problem_id: problem_id,
        language: language,
        output: false
      }
    }
    res.status(201).json(json);
  } catch (error) {
    console.error('Error processing data in backend (b):', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
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



