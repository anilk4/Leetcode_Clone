import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resizable } from 'react-resizable';
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import './Panel/Resizable.css';
import { useSelector } from "react-redux";

const Display = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});
  const data = useSelector(store => store.leetCodeProblems.problems);

  console.log("display data: ", data);

  async function getData() {
    const selectedProblem = data.problems.find(prob => prob.id === parseInt(id));
    console.log("selectedProblem: ", selectedProblem);

    setData(selectedProblem || {});
  }

  useEffect(() => {
    getData();
  }, [id, data]);


  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left side: Problem Description */}
        <div className="col-md-6 border-right">
          {Data.id && <LeftPanel data={Data}></LeftPanel>}
        </div>
        {/* Right side: Editor */}
        <div className="col-md-6">
          {Data.id && <RightPanel data={Data}/>}
        </div>
      </div>
    </div>
  );
};

export default Display;
