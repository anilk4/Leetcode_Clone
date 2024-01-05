import { useState } from "react";
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
  //   const [jobDetails, setJobDetails] = useState(null);

  async function handleSubmit() {
    console.log(code);

    const payLoad = {
      language,
      code,
    };

    try {
      setJobId("");
      setStatus("");
      setResult("");
      const ans = await axios.post("http://localhost:5000/run", payLoad);
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
          //   setJobDetails(job);
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
        const errorMessage = response.data.stderr;
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
              console.log(e.target.value);
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
          onChange={(newCode) => setCode(newCode)}
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
