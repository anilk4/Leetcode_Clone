import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftPanel from "./LeftPanel";

const Display = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});

  async function getData() {
    const data = await fetch("http://localhost:3000/problem/getAll");
    const json = await data.json();
    console.log(json);
    const Problems = json.course || [];
    const selectedProblem = Problems.find(
      (problem) => problem.id === parseInt(id, 10)
    );
    
    setData(selectedProblem);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {console.log("Data ", Data)}
      <div className="display">
        <h1>Id: {id}</h1>
        <LeftPanel data={Data}></LeftPanel>
      </div>
    </div>
  );
};

export default Display;
