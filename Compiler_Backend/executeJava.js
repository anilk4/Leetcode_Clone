const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}`);

  return new Promise((resolve, reject) => {
    exec(`javac ${filepath} -d ${outPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Compilation error:", error);
        reject({ error, stderr });
        return;
      }

      console.log("Compilation successful:", stdout);

      let fileName = fs
        .readdirSync(outPath)
        .find((file) => file.endsWith(".class"));

      if (!fileName) {
        reject(new Error(`No .class file found in ${outPath}`));
        return;
      }

      fileName = fileName.split(".")[0];

      exec(`cd ${outPath} && java ${fileName}`, (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", error);
          reject({ error, stderr });
        } else {
          console.log("Execution output:", stdout);
          resolve(stdout);
        }
      });
    });
  });
};

module.exports = {
  executeJava,
};
