import React from "react";
import CaptionLogin from "./pages/CaptionLogin";
import CaptionSignup from "./pages/CaptionSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogout from "./pages/UserLogout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptionHome from "./pages/CaptionHome";
import CaptionProtectedWrapper from "./pages/CaptionProtectedWrapper";
import CaptionLogout from "./pages/CaptionLogout";
import Riding from "./pages/Riding";
import CaptionRiding from "./pages/CaptionRiding";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/caption-login" element={<CaptionLogin />} />
        <Route path="/caption-singup" element={<CaptionSignup />} />

        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/caption-home"
          element={
            <CaptionProtectedWrapper>
              <CaptionHome />
            </CaptionProtectedWrapper>
          }
        />

        <Route
          path="/caption-logout"
          element={
            <CaptionProtectedWrapper>
              <CaptionLogout />
            </CaptionProtectedWrapper>
          }
        />
        <Route
          path="/caption-riding"
          element={
            <CaptionProtectedWrapper>
              <CaptionRiding />
            </CaptionProtectedWrapper>
          }
        />

        <Route
          path="/riding"
          element={
            <UserProtectedWrapper>
              <Riding />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
