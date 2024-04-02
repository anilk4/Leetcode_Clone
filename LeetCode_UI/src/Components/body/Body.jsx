import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import ProblemCard from "../ProblemCard";
import { HomeCarousel } from "../HomeCarousel/HomeCarousel";
import Display from "../DisplayProblem";
import { Link, useNavigate } from "react-router-dom";
import "./body.css"; // Import your custom CSS file for styling
import { useDispatch, useSelector } from "react-redux";

import { getProblems } from "../../redux/reducers/problemReducer";
const RecordsPerPage = 10;

const Body = () => {
  const [problems, setProblems] = useState([]);
  const [filterProblems, setFilterProblems] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.leetCodeProblems.problems);

  const courseProblems = data.problems || [];

  useEffect(() => {
    dispatch(getProblems());
  }, []);

  useEffect(() => {
    // Check if the data has been fetched before updating state
    if (courseProblems.length > 0) {
      setProblems(courseProblems);
      setFilterProblems(courseProblems);
    }
  }, [courseProblems]);

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
      case "Easy":
        return "green"; // Adjust the color as needed
      case "Medium":
        return "orange"; // Adjust the color as needed
      case "Hard":
        return "red"; // Adjust the color as needed
      default:
        return "black"; // Default color
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
    <div className="body-container">
      <div className="carousel-container">
        <HomeCarousel />
        <div className="search-container">
          <div className="search-input">
            <label htmlFor="difficultyLevel" className="mr-2">
              Search Problem:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Search Problem"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
          </div>
          <div className="difficulty-dropdown-container">
            <label htmlFor="difficultyLevel" className="mr-2">
              Difficulty:
            </label>
            <select
              id="difficultyLevel"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="form-control difficulty-dropdown"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
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
                <td
                  className="clickable"
                  onClick={() => navigate(`/display/${problem.id}`)}
                >
                  {problem.title}
                </td>
                <td style={{ color: getTextColor(problem.difficulty) }}>
                  {problem.difficulty}
                </td>
                <td>{problem.related_topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className="pagination-container">
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
