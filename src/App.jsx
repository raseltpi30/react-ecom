import React, { useState, useEffect } from "react";
import MasterLayout from "./components/MasterLayout"; // Import Master Layout
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {!isLoggedIn ? (
        showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} setShowRegister={setShowRegister} />
        )
      ) : (
        <>
          {/* Logout Button */}
          <div className="flex justify-center p-4">
            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
          </div>

          {/* Use Master Layout */}
          <MasterLayout />
        </>
      )}
    </>
  );
};

export default App;
