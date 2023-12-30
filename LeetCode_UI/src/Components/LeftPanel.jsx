// LeftPanel.jsx
import React from 'react';

function LeftPanel({ data }) {
  console.log(data);
  
  const renderDescription = (description) => {
    if (!description) {
      return null;
    }
  
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="left-panel">
      <h1>{data.title}</h1>
      <div>{renderDescription(data.description)}</div>

      <div>
        <strong>Difficulty:</strong> {data.difficulty}
      </div>

      <div>
        <strong>Acceptance Rate:</strong> {data.acceptance_rate}%
      </div>

      <div>
        <strong>Companies:</strong> {data.companies}
      </div>

      <div>
        <strong>Related Topics:</strong> {data.related_topics}
      </div>

      <div>
        <strong>Constraints:</strong>
        <ul>
          <li>{`2 <= nums.length <= 103`}</li>
          <li>{`-109 <= nums[i] <= 109`}</li>
          <li>{`-109 <= target <= 109`}</li>
          {/* Add more constraints as needed */}
        </ul>
      </div>
    </div>
  );
}

export default LeftPanel;
