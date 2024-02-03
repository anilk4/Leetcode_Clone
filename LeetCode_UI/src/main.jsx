import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from './redux/store.js';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProblems } from "../src/redux/reducers/problemReducer.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Init />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

function Init() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.leetCodeProblems.problems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/problem/getAll");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(getProblems(data)); // Assuming you have an action creator named getProblems
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [dispatch]); // Make sure to include dispatch as a dependency

  return null; // React components must return something
}
