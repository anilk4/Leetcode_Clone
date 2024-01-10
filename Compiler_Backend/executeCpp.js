const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define the output path for compiled programs
const outputPath = path.join(__dirname, "outputs");

// Create the output path if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Function to execute a C++ program
const executeCpp = (filepath) => {
  // Extract the job ID from the filename
  const jobId = path.basename(filepath).split(".")[0];

  // Define the output path for the compiled program
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    // Execute the compilation and run command
    exec(
      // Original command with 'cd' for Unix-like environments
      // `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,

      // Updated command without 'cd' for Windows environment
      `g++ ${filepath} -o ${outPath} && ${outPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeCpp,
};