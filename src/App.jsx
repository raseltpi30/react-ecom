import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./components/frontend/MasterLayout";
import LoginForm from "./components/frontend/LoginForm";
import AdminLoginForm from "./components/admin/AdminLoginForm";
import AdminRegisterForm from "./components/admin/AdminRegisterForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogoutButton from "./components/admin/AdminLogoutButton";
import LogoutButton from "./components/frontend/LogoutButton";
import RegisterForm from "./components/frontend/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

  useEffect(() => {
    const userToken = localStorage.getItem("user_auth_token");
    const adminToken = localStorage.getItem("admin_auth_token");

    // ✅ Admin Login Check
    if (adminToken) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    // ✅ User Login Check
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);



  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Home Route - Private */}
        <Route
          path="/"
          element={isLoggedIn ? <MasterLayout setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />

        <Route
          path="/admin/login"
          element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLoginForm setIsAdmin={setIsAdmin} />}
        />

        <Route
          path="/admin/register"
          element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminRegisterForm setIsAdmin={setIsAdmin} />}
        />

        <Route
          path="/admin/dashboard"
          element={isAdmin ? (
            <>
              <AdminDashboard setIsAdmin={setIsAdmin} />
            </>
          ) : <Navigate to="/admin/login" />}
        />

        <Route
          path="/admin/logout"
          element={<Navigate to="/admin/login" />} // Redirect to login after logout
        />
        <Route
          path="/logout"
          element={<Navigate to="/login" />} // Redirect to login after logout
        />
        {/* Register Route */}
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterForm /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
