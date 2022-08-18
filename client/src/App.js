import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Settings from "./pages/Settings";
import AlertBox from "./components/AlertBox";
import VerifyAlert from "./components/VerifyAlert";
import ReqPassReset from "./pages/ReqPassReset";
import PassReset from "./pages/PassReset";
import styled from "styled-components";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const logout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  useEffect(() => {
    if (new Date(localStorage.getItem("tokenExpireIn")) < new Date()) {
      logout();
    }
  }, [logout]);

  return (
    <>
      {user && !user.verified && <VerifyAlert />}
      <Header />
      <Body>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login kind="login" />} />
          <Route exact path="/register" element={<Login kind="signup" />} />
          <Route exact path="/editor" element={<Editor />} />
          <Route
            exact
            path="/editor/:slug"
            element={<Editor isEdit={true} />}
          />
          <Route exact path="/article/:slug" element={<Detail />} />
          <Route exact path="/profile/:username" element={<Profile />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route
            exact
            path="/requestPasswordReset"
            element={<ReqPassReset />}
          />
          <Route
            exact
            path="/passwordReset/:userId/:resetString"
            element={<PassReset />}
          />
        </Routes>
      </Body>
      <AlertBox />
    </>
  );
};

const Body = styled.div`
  width: 70%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  margin: 0 auto;
`;

export default App;
