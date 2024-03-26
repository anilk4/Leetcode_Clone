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
      return res.status(500).json({ success: false, error: "code is empty" });
    }

    const filepath = await generateFile(language, code);

    const job = await new Job({ language, filepath }).save();
    if (job === undefined) {
      throw Error(`Cannot find Job with id ${jobId}`);
    }
    const jobId = job["_id"];
    await addJobToQueue(jobId);

    console.log("job: ", job);

    // Wait until the job is completed and the output is available
    let jobObject = await Job.findById(jobId);
    console.log("first", jobObject);

    // Continue checking if the job is completed and output is available
    while ((jobObject.status !== 'success' || jobObject.output === undefined) && jobObject.status !== 'error') {
      // Add some delay before checking again (e.g., 1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Fetch the updated jobObject
      jobObject = await Job.findById(jobId);
      console.log("inside while loop for syntax error output : ", jobObject.output);
    }



    console.log("outside while loop for syntax error output : ", jobObject.output);
    let json = {};
    let out2 = output // Remove newline characters
    let job2 = jobObject.output.replace(/\s+/g, '').replace(/\]\s*,\s*\[/g, '],[').trim(); // Remove newline characters
    let result = jobObject.output.replace(/\n\r/g, "");

    if (out2 === job2) {
      json = {
        username: username,
        problem_id: problem_id,
        language: language,
        output: true,
        TimeComplexity: jobObject.TimeComplexity,
        result: result
      };
    } else {
      json = {
        username: username,
        problem_id: problem_id,
        language: language,
        output: false,
        TimeComplexity: jobObject.TimeComplexity,
        result: result
      };
    }

    console.log("Jobobject output 2: ", json);
    console.log( "job:", job2, "out:", out2)
    res.status(201).json(json);

  } catch (error) {
    console.error('Error processing data in backend:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// app.get("/status", async (req, res) => {
//   const jobId = req.query.id;

//   if (jobId === undefined) {
//     return res
//       .status(400)
//       .json({ success: false, error: "missing id query param" });
//   }

//   const job = await Job.findById(jobId);

//   if (job === undefined) {
//     return res.status(400).json({ success: false, error: "couldn't find job" });
//   }



//   return res.status(200).json({ success: true, job });
// });

// app.get('/data', async (req, res) => {
//   try {
//       const result = await Test.findOne({ result_id: 1 });

//       return res.json(result);
//   } catch (error) {
//       console.error('Error fetching data from MongoDB:', error);
//       return res.status(500).send('Internal Server Error');
//     }
// });

app.listen(5000, () => {
  console.log("listening on port 5000");
});



