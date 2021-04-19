import { spawn } from "child_process";
// import winston from "winston";
import path from "path";

const MLmodelsPath = "./MLmodels";
const python3 = `${MLmodelsPath}/bin/python3`;
const pyScript = `${MLmodelsPath}/analyzeSignedForm.py`;

export default function py_analyzeFormData(fileName) {
  const jsonDataPromise = new Promise((resolve, reject) => {
    console.log("spawning: ", `${python3} ${pyScript} ${fileName}`);
    const pythonProcess = spawn(python3, [pyScript, fileName]);

    pythonProcess.stdout.on("data", (data) => {
      resolve(JSON.parse(data));
    });
    pythonProcess.stderr.on("error", (error) => {
      reject(error);
    });
  });
  return jsonDataPromise;
}

// function execShellCommand(cmd) {
//   return new Promise((resolve, reject) => {
//     exec(cmd, (error, stdout, stderr) => {
//       if (error) {
//         console.warn(error);
//       }
//       resolve(stdout ? stdout : stderr);
//     });
//   });
// }
