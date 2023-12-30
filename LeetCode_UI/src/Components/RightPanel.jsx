// RightPanel.jsx
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function RightPanel() {
  const code = "var message = 'Monaco Editor!' \nconsole.log(message);";
  return (
    <div className="right-panel">
      <AceEditor
        className="ace-editor"
        height="300px"
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
      />
    </div>
  );
}
export default RightPanel;
