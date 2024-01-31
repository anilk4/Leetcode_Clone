import { useEffect, useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from '../store/selector/userEmail.js';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/ext-language_tools";
import "./Compiler.css";
import { Typography } from "@mui/material";
import Terminal from "./Terminal.jsx";



function Compiler({selectedProblem}) {


  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [data, setData] = useState(null);
  const [finalCode, setFinalCode] = useState("");
  const userEmail = useRecoilValue(userEmailState);
  const ExpOut =  JSON.stringify(selectedProblem?.testcase?.output)


  const userToken = localStorage.getItem("userToken");
  
  localStorage.setItem("language",language===null?"java":language);

  useEffect(() => {

        const codePython = selectedProblem?.testcase?.py;
        const codeCPP = selectedProblem?.testcase?.cpp;
        const codeJava = selectedProblem?.testcase?.java;
        const codejs = selectedProblem?.testcase?.js;

        if (language === "py") {
          setCode(codePython?.user_code || "");
        } else if (language === "java") {
          setCode(codeJava?.user_code || "");
        } else if (language === "cpp") {
          setCode(codeCPP?.user_code || "");
        } else {
          setCode(codejs?.user_code || "");
        }
 
    }
   ,[language]);

  useEffect(() => {
    if (language === "py") {
      setFinalCode(code + '\n' + (selectedProblem.testcase?.py?.initial_code || ""));
    } else if (language === "java") {
      const finalJavaCode = insertCodeBetweenImportsAndSolution((selectedProblem.testcase?.java?.initial_code || ""), code);
      setFinalCode(finalJavaCode);
    } else if (language === "js") {
      setFinalCode(code + (selectedProblem.testcase?.js?.initial_code || ""));
    } else {
      setFinalCode(code + (selectedProblem.testcase?.cpp?.initial_code || ""));
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
        initial_code + '\n' +
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
      setResult("");
      
      // console.log(userEmail)
      
      const ans = await axios.post("http://localhost:3000/problem/code", {
        username: userEmail,
        language: language,
        code: finalCode,
        problem_id: selectedProblem.id,
        output: JSON.stringify(selectedProblem.testcase.output)
      },{
        headers:{
          Authorization:`Bearer ${userToken}`,
          "Content-Type":"application/json"
        }
      });
      
      setResult(ans);
      console.log("result setted", ans);

   } 
    catch ({ response }) {
      if (response) {
        console.log(response)
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
              const selectedValue = e.target.value;
              setLanguage(selectedValue);
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
          height="400px"
          width="100%"
          value={code}
          mode="javascript"
          theme="vibrant_ink"
          fontSize="14px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          onChange={(newCode) => setCode(newCode)}
        />

        {userEmail && <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>}
        {!userEmail && <Typography>you need to login first to submit this code</Typography>}
      </div>
      
        {result && <Terminal Exp = {ExpOut} termi = {result} />}
    </>
  );
}

export default Compiler;
