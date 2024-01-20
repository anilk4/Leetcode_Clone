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
    const selectedProblem = await data.problems.find(prob => prob.id === parseInt(id));
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
          <LeftPanel data={Data}></LeftPanel>
        </div>
        {/* Right side: Editor */}
        <div className="col-md-6">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Display;
