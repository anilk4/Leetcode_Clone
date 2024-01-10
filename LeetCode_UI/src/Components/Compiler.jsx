import { useEffect, useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "./Compiler.css";

function Compiler() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("java");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const [finalCode, setFinalCode] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/data");
        const data = await response.json();
        setData(data);

        const codePython = data.py;
        const codeCPP = data.cpp;
        const codeJava = data.java;
        const codejs = data.js;

        if (language === "py") {
          setCode(codePython.user_code || "");
        } else if (language === "java") {
          setCode(codeJava.user_code || "");
        } else if (language === "cpp") {
          setCode(codeCPP.user_code || "");
        } else {
          setCode(codejs.user_code || "");
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }

    fetchData();
  }, [language]);

  useEffect(() => {
    if (language === "py") {
      setFinalCode(code +'\n'+ (data?.py?.initial_code || ""));
    } else if (language === "java") {
      const finalJavaCode = insertCodeBetweenImportsAndSolution((data?.java?.initial_code || ""), code);
      setFinalCode(finalJavaCode);
    } else if (language === "js") {
      setFinalCode((data?.js?.initial_code || "") +'\n'+ code);
    } else {
      setFinalCode((data?.cpp?.initial_code || "") +'\n'+ code);
    }
  }, [language, code, data]);

const insertCodeBetweenImportsAndSolution = (initial_code, userCode) => {
  const lines = userCode.split('\n');
  let lastImportIndex = -1;
  let classIndex = -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim().startsWith("import ")) {
      lastImportIndex = i;
      break;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("class Solution")) {
      classIndex = i;
      break;
    }
  }

  if (lastImportIndex !== -1 && classIndex !== -1) {
    // console.log("importStatements",initial_code);
    const modifiedUserCode =
      lines.slice(0, lastImportIndex + 1).join('\n') +
      '\n' + 
      initial_code + '\n'+
      lines.slice(classIndex).join('\n') 
    
    return modifiedUserCode;
  } else if (classIndex === -1) {
    // console.log("importStatements",initial_code);

    const modifiedUserCode =
      lines.slice(0, lastImportIndex + 1).join('\n') +
      '\n' +  
      initial_code 

    return modifiedUserCode;
  }
  // console.log("importStatements",initial_code);
  return initial_code + userCode;
};



  async function handleSubmit() {
    console.log(finalCode);

    try {
      setJobId("");
      setStatus("");
      setResult("");
      const ans = await axios.post("http://localhost:5000/run", {
        language: language,
        code: finalCode,
      });
      console.log(ans);
      setJobId(ans.data.jobId);

      let interval = setInterval(async () => {
        const { data: statusRes } = await axios.get(
          "http://localhost:5000/status",
          {
            params: { id: ans.data.jobId },
          }
        );
        const { success, job, error } = statusRes;
        console.log(statusRes);

        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          if (jobStatus === "pending") return;
          setResult(jobOutput);
          clearInterval(interval);
        } else {
          console.error(error);
          setResult(error);
          setStatus("Bad request");
          clearInterval(interval);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errorMessage = response.data.response;
        setResult(errorMessage);
      } else {
        setResult("Something went wrong");
      }
    }
  }

  return (
    <>
      <div>
        <h2>Code Compiler</h2>
        <div>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="java">Java</option>
            <option value="py">Python</option>
            <option value="js">Javascript</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <AceEditor
          className="ace-editor"
          height="500px"
          width="100%"
          value={code}
          mode="javascript"
          theme="monokai"
          fontSize="16px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          onChange={(newCode) => {
            setCode(newCode);
          }}
        />

        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <p>{status}</p>
      <p>{jobId ? `Job ID: ${jobId}` : ""}</p>
      <p>{result}</p>
    </>
  );
}

export default Compiler;
