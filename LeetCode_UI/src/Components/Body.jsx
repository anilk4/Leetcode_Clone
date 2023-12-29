import React, { useState, useEffect } from "react";
import ProblemCard from "./ProblemCard";
import { HomeCarousel } from "./HomeCarousel/HomeCarousel";

const filterData = (searchTxt, problems) => {
  return problems.filter((prob) =>
    prob?.title?.toLowerCase()?.includes(searchTxt.toLowerCase())
  );
};

const Body = () => {
  const [problems, setProblems] = useState([]);
  const [filterProblems, setFilterProblems] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  useEffect(() => {
    getProblems();
  }, []);

  async function getProblems() {
    try {
      const response = await fetch('http://localhost:3000/problem/getAll');
      const data = await response.json();
      const courseProblems = data.course || [];
      setProblems(courseProblems);
      setFilterProblems(courseProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

  return (
    <div className="Allproblems">
      <HomeCarousel/>
      <input
        type="text"
        placeholder="Search Problem"
        value={searchTxt}
        className="search-input"
        onChange={(e) => {
          setSearchTxt(e.target.value);
        }}
      />
      <button
        className="search-btn"
        onClick={() => {
          const data = filterData(searchTxt, problems);
          setFilterProblems(data);
        }}
      >
        Search
      </button>
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
