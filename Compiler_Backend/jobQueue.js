const Queue = require("bull");
const jobQueue = new Queue("job-runner-queue");
const Job = require("./models/job");

const { executeJava } = require("./executeJava");
const { executePython } = require("./executePython");
const { executeJS } = require("./executeJavascript");
const {executeCpp } = require("./executeCpp")

const NUM_WORKS = 5;

jobQueue.process(NUM_WORKS, async ({ data }) => {
  console.log(data);
  const jobId = data.id;
  const job = await Job.findById(jobId);

  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }

  try {
    let output;
    let startTime = new Date(); 
    job["startedAt"] = startTime;
    if (job.language === "java") {
      output = await executeJava(job.filepath);
    } else if (job.language === "py") {
      output = await executePython(job.filepath);
      console.log(output);
    } else if (job.language === "js") {
      console.log("js here");
      output = await executeJS(job.filepath);
      console.log("output ", output);
    } else {
      output = await executeCpp(job.filepath);
      console.log("Cpp Executed", output);
    }

    let endTime = new Date(); // Record the end time
    job["completedAt"] = endTime;

// Calculate the time taken in milliseconds
    let timeTaken = endTime.getTime() - startTime.getTime();

// Convert milliseconds to seconds for readability
    

    console.log("Run Time: ", timeTaken, " ms");

    job["status"] = "success";
    job["output"] = output;
    job["TimeComplexity"] = timeTaken;

    await job.save();

    console.log(job);
    return true;

  } catch (error) {
    if (job) {
      job["completedAt"] = new Date();
      job["status"] = "error";
      job["output"] = JSON.stringify(error);
      await job.save();
    }

    console.error("error: ", JSON.stringify(error));
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

module.exports = {
  addJobToQueue,
};
