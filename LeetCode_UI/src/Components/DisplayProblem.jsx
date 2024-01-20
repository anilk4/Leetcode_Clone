import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Resizable } from 'react-resizable';
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import './Panel/Resizable.css';

const Display = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});

  async function getData() {
    const data = await fetch("http://localhost:3000/problem/getAll");
    const json = await data.json();
    console.log(json);
    const Problems = json.problems || [];
    const selectedProblem = Problems.find(
      (problem) => problem.id === parseInt(id, 10)
    );
    setData(selectedProblem);
  }

  useEffect(() => {
    getData();
  }, [id]);


  return (
    /*     <div>
          <div className="display">
            <LeftPanel data={Data}></LeftPanel>
            <RightPanel />
          </div>
        </div> */
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
