import React, { useState, useEffect } from "react";
import ProblemCard from "./ProblemCard";
import { HomeCarousel } from "./HomeCarousel/HomeCarousel";



const Body = () => {
  const [problems, setProblems] = useState([]);
  const [filterProblems, setFilterProblems] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("All");

  useEffect(() => {
    getProblems();
  }, []);

  async function getProblems() {
    try {
      const response = await fetch("http://localhost:3000/problem/getAll");
      const data = await response.json();
      const courseProblems = data.course || [];
      setProblems(courseProblems);
      setFilterProblems(courseProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

  const filterData = (searchTxt, difficultyLevel, problems) => {
    return problems.filter(
      (prob) =>
        prob?.title?.toLowerCase()?.includes(searchTxt.toLowerCase()) &&
        (difficultyLevel === "All" || prob?.difficulty === difficultyLevel)
    );
  };

  useEffect(() => {
    const data = filterData(searchTxt, difficultyLevel, problems);
    setFilterProblems(data);
  }, [searchTxt, difficultyLevel, problems]);

  return (
    <div className="Allproblems">
      <HomeCarousel />
      <input
        type="text"
        placeholder="Search Problem"
        value={searchTxt}
        className="search-input"
        onChange={(e) => {
          setSearchTxt(e.target.value);
        }}
      />
      
      <select
        value={difficultyLevel}
        onChange={(e) => setDifficultyLevel(e.target.value)}
        className="difficulty-dropdown"
      >
        <option value="All">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Topics</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {filterProblems.map((problem) => (
            <ProblemCard {...problem} key={problem._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
