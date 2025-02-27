import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "../components/frontend/MasterLayout";
import LoginForm from "../components/frontend/LoginForm";
import RegisterForm from "../components/frontend/RegisterForm";

const FrontendRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <MasterLayout setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
      />

      <Route
        path="/register"
        element={!isLoggedIn ? <RegisterForm /> : <Navigate to="/" />}
      />

      <Route path="/logout" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default FrontendRoutes;
