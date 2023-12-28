import React, { useState, useEffect } from "react";
import ProblemCard from "./ProblemCard";

const Body = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems();
  }, []);

async function getProblems() {
  try {
    const response = await fetch('http://localhost:3000/problem/getAll');
    const data = await response.json();
    const courseProblems = data.course || [];
    setProblems(courseProblems); // Set the data to the state
  } catch (error) {
    console.error("Error fetching problems:", error);
  }
}


  return (
    <div className="Allproblems">
  {problems.map((problem) => {
    return (
      <ProblemCard {...problem} key={problem._id} />
    );
  })}
</div>

  );
};

export default Body;
