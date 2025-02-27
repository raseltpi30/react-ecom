import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FrontendRoutes from "./routes/FrontendRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("user_auth_token");
    const adminToken = localStorage.getItem("admin_auth_token");
    setIsAdmin(!!adminToken);
    setIsLoggedIn(!!userToken);
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* User Routes */}
      <FrontendRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* Admin Routes */}
      <AdminRoutes isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </Router>
  );
};

export default App;
