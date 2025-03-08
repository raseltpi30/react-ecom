import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MasterLayout from "../components/frontend/MasterLayout";
import LoginForm from "../components/frontend/LoginForm";
import RegisterForm from "../components/frontend/RegisterForm";
import ProductDetails from "../components/frontend/product/ProductDetails";
import Cart from "../components/frontend/product/Cart";

const FrontendRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={isLoggedIn ? <MasterLayout setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
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

      {/* Product Details Route with Auth Check */}
      <Route
        path="/product/:id"
        element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart"
        element={isLoggedIn ? <Cart setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" state={{ from: location }} />}
      />


      {/* Logout Route */}
      <Route path="/logout" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default FrontendRoutes;
