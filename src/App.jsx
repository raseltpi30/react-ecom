import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./components/MasterLayout";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        {/* Home Route - Private */}
        <Route 
          path="/" 
          element={isLoggedIn ? <MasterLayout /> : <Navigate to="/login" />} 
        />
        
        {/* Login Route */}
        <Route 
          path="/login" 
          element={!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
        />
        
        {/* Register Route */}
        <Route 
          path="/register" 
          element={!isLoggedIn ? <RegisterForm /> : <Navigate to="/" />} 
        />
      </Routes>

      {isLoggedIn && (
        <div className="flex justify-center p-4">
          <LogoutButton setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </Router>
  );
};

export default App;
