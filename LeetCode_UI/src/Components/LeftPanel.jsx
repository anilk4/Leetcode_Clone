// LeftPanel.jsx
import React from "react";

function LeftPanel({ data }) {
  console.log(data);

  const renderDescription = (description) => {
    if (!description) {
      return null;
    }

    const lines = description.split("\n");
    const renderedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Check if the line starts with "Example"
      if (line.trim().startsWith("Example")) {
        // Extract the example number
        const exampleNumber = line.match(/\d+/)[0];

        // Create a div with a gray background for the example
        const exampleDiv = (
          <div
            key={`example-${exampleNumber}`}
            style={{
              backgroundColor: "#342F2F",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{line}</div>

            {/* Nested div for input */}
            <div
              style={{ paddingLeft: "20px", padding: "5px", margin: "5px 0" }}
            >
              <span style={{ fontWeight: "bold" }}>Input: </span>
              <span style={{color:'#c0c0c0',fontWeight: "bold",fontFamily:'Gill Sans, sans-serif' }}>{lines[i + 1].replace("Input:", "").trim()}</span>
            </div>

            {/* Nested div for output */}
            <div
              style={{ paddingLeft: "20px", padding: "5px", margin: "5px 0" }}
            >
              <span style={{ fontWeight: "bold" }}>Output: </span>
              <span style={{color:'#c0c0c0',fontWeight: "bold",fontFamily:'Gill Sans, sans-serif' }}>{lines[i + 2].replace("Output:", "").trim()}</span>
            </div>

            {/* Nested div for explanation (if present) */}
            {lines[i + 3] && (
              <div
                style={{ paddingLeft: "20px", padding: "5px", margin: "5px 0" }}
              >
                <span style={{ fontWeight: "bold" }}>Explanation: </span>
                <span style={{color:'#c0c0c0',fontWeight: "bold",fontFamily:'Gill Sans, sans-serif' }}>{lines[i + 3].replace("Explanation:", "").trim()}</span>
              </div>
            )}
          </div>
        );

        renderedLines.push(exampleDiv);

        // Skip the lines that were processed within the example div
        i += 3;
      } else {
        // If not an example line, render the line with a line break
        const normalLine = (
          <React.Fragment key={`line-${i}`}>
            {line}
            <br />
          </React.Fragment>
        );

        renderedLines.push(normalLine);
      }
    }

    return renderedLines;
  };

  return (
    <div className="p-3" style={{ background: "black", color: "white" }}>
      <h1>{data.title}</h1>
      <div>{renderDescription(data.description)}</div>
      <br />
      <div>
        <strong>Difficulty:</strong> {data.difficulty}
      </div>
      <br />
      <div>
        <strong>Acceptance Rate:</strong> {data.acceptance_rate}%
      </div>
      <br />
      <div>
        <strong>Companies:</strong> {data.companies}
      </div>
      <br />
      <div>
        <strong>Related Topics:</strong> {data.related_topics}
      </div>
    </div>
  );
}

export default LeftPanel;
