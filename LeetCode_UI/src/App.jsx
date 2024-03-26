import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Discuss from "./Components/Discuss";
import { useEffect } from "react";
import Error from "./Components/Error";
import Favourites from "./Components/Favourites";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/Body";
import NavHeader from "./Components/NavHeader";
import Display from "./Components/DisplayProblem";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { userState } from "./store/atoms/user";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BASE_URL } from "./config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import UserProfile from "./Components/UserProfile";


const LazyProfile = lazy(() => import("./Components/UserProfile"));

const MinHeightWrapper = ({ children }) => {
  return <div style={{ minHeight: "55vh" }}>{children}</div>;
};

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <InitUser />
        <NavHeader className="h-25" />
        <Routes>
          <Route
            path="/"
            element={
              <MinHeightWrapper>
                <Body />
              </MinHeightWrapper>
            }
          />
          <Route
            path="/userProfile"
            element={
              <MinHeightWrapper>
                <UserProfile/>
              </MinHeightWrapper>
            }
          />
          <Route
            path="/favorite"
            element={
              <MinHeightWrapper>
                <Favourites />
              </MinHeightWrapper>
            }
          />
          <Route
            path="/display/:id"
            element={
              <MinHeightWrapper>
                <Display />
              </MinHeightWrapper>
            }
          />
          <Route
            path="/discuss"
            element={
              <MinHeightWrapper>
                <Discuss />
              </MinHeightWrapper>
            }
          />

          <Route
            path="*"
            element={
              <MinHeightWrapper>
                <Error />
              </MinHeightWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <MinHeightWrapper>
                <Login />
              </MinHeightWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <MinHeightWrapper>
                <Register />
              </MinHeightWrapper>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
};

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/account/me`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      console.log(res.data);
      if (res.data) {
        setUser({
          userEmail: res.data.username,
        });
      } else {
        setUser({
          userEmail: null,
        });
      }
    } catch (e) {
      console.log(e);
      setUser({
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    console.log("Login");
    init();
  }, []);
  return <div></div>;
}
export default App;
