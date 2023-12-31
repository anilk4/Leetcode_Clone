import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import ProblemCard from "./ProblemCard";
import { HomeCarousel } from "./HomeCarousel/HomeCarousel";
import Display from "./DisplayProblem";
import { Link } from "react-router-dom";
import './Panel/Resizable.css';

const RecordsPerPage = 10;

const Body = () => {
  const [problems, setProblems] = useState([]);
  const [filterProblems, setFilterProblems] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalRecords = filterProblems.length;
  const totalPages = Math.ceil(totalRecords / RecordsPerPage);

  const currentData = filterProblems.slice(
    (currentPage - 1) * RecordsPerPage,
    currentPage * RecordsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-3">
        <HomeCarousel />
        <div className="container">
          <div className="row d-flex justify-content-center"> {/* Center the content */}
            <div className="col-md-6">
              <label htmlFor="difficultyLevel" className="mr-2">Search Problem:</label>
              <input
                className="form-control"
                type="text"
                style={{ width: '200px' }}
                placeholder="Search Problem"
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="difficultyLevel" className="mr-2">Difficulty Level:</label>
              <select
                id="difficultyLevel"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="form-control difficulty-dropdown"
                style={{ width: '200px' }}
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.id}</td>
                <Link to={`/display/${problem.id}`} className="text-decoration-none text-dark wrap-text d-flex align-items-center">
                  <td>{problem.title}</td>
                </Link>
                <td style={{ color: getTextColor(problem.difficulty) }}>{problem.difficulty}</td>
                <td>{problem.related_topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination className="d-flex justify-content-center"> {/* Center the pagination */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Body;
