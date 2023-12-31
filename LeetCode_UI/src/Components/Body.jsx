import React, { useState, useEffect } from "react";
import ProblemCard from "./ProblemCard";
import { HomeCarousel } from "./HomeCarousel/HomeCarousel";
import Display from "./DisplayProblem";
import { Link } from "react-router-dom";
import './Panel/Resizable.css';



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

  const getTextColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'green'; // Adjust the color as needed
      case 'Medium':
        return 'orange'; // Adjust the color as needed
      case 'Hard':
        return 'red'; // Adjust the color as needed
      default:
        return 'black'; // Default color
    }
  };


  return (
    <div>
      <div className="mb-3">
        <HomeCarousel />
        <input
          class="form-control rounded col-md-6"
          type="text"

          placeholder="Search Problem"
          value={searchTxt}
          className="search-input"
          onChange={(e) => {
            setSearchTxt(e.target.value);
          }}
        />


        {/*       <label>Difficulty Level: 
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
      </label> */}

        <label className="mr-2">Difficulty Level:</label>
        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
          className={`custom-select ${difficultyLevel === 'Easy' ? 'text-green' : (difficultyLevel === 'Medium' ? 'text-orange' : (difficultyLevel === 'Hard' ? 'text-white' : ''))}`}
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

      </div>

      <div >
        <table /* className="custom-table" */ className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th >Title</th>
              <th >Topics</th>
              <th >Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filterProblems.map((problem) => (
              /*             <Link to={`/display/${problem.id}`}>
                          <ProblemCard {...problem} key={problem._id} />
                          </Link> */
              <tr key={problem.id}>
                <td>{problem.id}</td>
                <Link to={`/display/${problem.id}`} className="text-decoration-none text-dark wrap-text d-flex align-items-center"  >
                  <td >{problem.title}</td>
                </Link>
                <td style={{ color: getTextColor(problem.difficulty) }} >{problem.difficulty}</td>
                <td>{problem.related_topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Body;
