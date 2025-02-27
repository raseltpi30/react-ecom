import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminLoginForm from "../components/admin/AdminLoginForm";
import AdminRegisterForm from "../components/admin/AdminRegisterForm";
import AdminDashboard from "../components/admin/AdminDashboard";

import ProductList from "../components/admin/products/ProductList";
import AddProduct from "../components/admin/products/AddProduct";
import EditProduct from "../components/admin/products/EditProduct";
import ProductDetails from "../components/admin/products/ProductDetails";

const AdminRoutes = ({ isAdmin, setIsAdmin }) => {
    const location = useLocation();
    const [checkedAdmin, setCheckedAdmin] = useState(false);

    // ✅ Ensure state is updated before redirecting
    useEffect(() => {
        const adminToken = localStorage.getItem("admin_auth_token");
        setIsAdmin(!!adminToken);
        setCheckedAdmin(true); // Mark check as complete
    }, [setIsAdmin]);

    if (!checkedAdmin) return null; // Wait until admin state is checked

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/admin/login"
                element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLoginForm setIsAdmin={setIsAdmin} />}
            />
            <Route
                path="/admin/register"
                element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminRegisterForm setIsAdmin={setIsAdmin} />}
            />

            {/* ✅ Manually Protect Admin Routes */}
            <Route
                path="/admin/dashboard"
                element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" state={{ from: location }} />}
            />
            <Route
                path="/admin/products"
                element={isAdmin ? <ProductList setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" state={{ from: location }} />}
            />
            <Route
                path="/admin/products/add"
                element={isAdmin ? <AddProduct /> : <Navigate to="/admin/login" state={{ from: location }} />}
            />
            <Route
                path="/admin/products/edit/:id"
                element={isAdmin ? <EditProduct /> : <Navigate to="/admin/login" state={{ from: location }} />}
            />
            <Route
                path="/admin/products/:id"
                element={isAdmin ? <ProductDetails /> : <Navigate to="/admin/login" state={{ from: location }} />}
            />

            {/* Logout Redirect */}
            <Route path="/admin/logout" element={<Navigate to="/admin/login" />} />
        </Routes>
    );
};

export default AdminRoutes;
