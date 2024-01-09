const { exec } = require("child_process");


const executeJava = (filepath) => {
 

  return new Promise((resolve, reject) => {
    exec(`java ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Execution error:", error);
        reject({ error, stderr });
      } else {
        console.log("Execution output:", stdout);
        resolve(stdout);
      }
    });
  });
};

module.exports = {
  executeJava,
};
