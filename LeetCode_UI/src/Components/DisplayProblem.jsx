import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useSelector } from "react-redux";
import { Splitter, SplitterPanel } from "primereact/splitter";

import "primereact/resources/themes/saga-blue/theme.css"; // Add the PrimeReact theme CSS
import "primereact/resources/primereact.min.css"; // Add the PrimeReact core CSS
import "primeicons/primeicons.css"; // Add the PrimeIcons CSS

const Display = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});
  const data = useSelector((store) => store.leetCodeProblems.problems);

  console.log("display data: ", data);

  async function getData() {
    const selectedProblem = data.problems?.find(
      (prob) => prob.id === parseInt(id)
    );
    console.log("selectedProblem: ", selectedProblem);

    setData(selectedProblem || {});
  }

  useEffect(() => {
    getData();
  }, [id, data]);

  return (
    <div className="container-fluid p-0">
      <Splitter style={{ height: '100%'}}>
        {/* Left side: Problem Description */}
        <SplitterPanel style={{ overflow: 'auto' }}>
          <div className="border-right p-0 " style={{ wordWrap: "break-word" }}>
            {Data.id && <LeftPanel data={Data}></LeftPanel>}
          </div>
        </SplitterPanel>

        {/* Right side: Editor */}
        <SplitterPanel style={{ overflow: 'auto' }}>
          <div className="p-0">{Data.id && <RightPanel data={Data} />}</div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default Display;
