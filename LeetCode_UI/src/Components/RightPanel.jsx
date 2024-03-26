// RightPanel.jsx
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Compiler from "./Compiler";

function RightPanel({data}) {
  return (
    <div /* className="right-panel" */ className=" px-2 text-light vh-100 " style={{background:"black"}}>
      <Compiler selectedProblem={data}></Compiler>
      {/* <AceEditor
        className="ace-editor"
        height="100%"
        width="100%"
        value={code}
        mode="javascript"
        theme="monokai"
        fontSize="16px"
        highlightActiveLine={true}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2
        }}
      /> */}
    </div>
  );
}
export default RightPanel;
