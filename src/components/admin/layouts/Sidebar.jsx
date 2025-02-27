import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaChevronDown, FaHome, FaUsers, FaCog, FaChartBar, FaBox } from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);

    // ✅ Toggle Submenu
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    // ✅ Function to check if a specific menu is active (Exact Match)
    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white p-5 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">Admin Panel</h2>
            
            <nav className="space-y-2">
                {/* ✅ Dashboard (Only Active on Exact Match) */}
                <Link to="/admin/dashboard"
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                        isActive("/admin/dashboard") ? "bg-blue-600" : "hover:bg-blue-700"
                    }`}
                >
                    <FaHome className="mr-3" /> Dashboard
                </Link>

                {/* Users */}
                <Link to="/admin/users"
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                        isActive("/admin/users") ? "bg-blue-600" : "hover:bg-blue-700"
                    }`}
                >
                    <FaUsers className="mr-3" /> Users
                </Link>

                {/* Settings */}
                <Link to="/admin/settings"
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                        isActive("/admin/settings") ? "bg-blue-600" : "hover:bg-blue-700"
                    }`}
                >
                    <FaCog className="mr-3" /> Settings
                </Link>

                {/* Reports */}
                <Link to="/admin/reports"
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                        isActive("/admin/reports") ? "bg-blue-600" : "hover:bg-blue-700"
                    }`}
                >
                    <FaChartBar className="mr-3" /> Reports
                </Link>

                {/* ✅ Products (Dropdown with Correct Active State) */}
                <div className="relative">
                    <button
                        onClick={() => toggleMenu("products")}
                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300 ${
                            openMenu === "products" || location.pathname.startsWith("/admin/products") 
                                ? "bg-blue-600" 
                                : "bg-blue-700 hover:bg-blue-600"
                        }`}
                    >
                        <span className="flex items-center">
                            <FaBox className="mr-3" /> Products
                        </span>
                        {openMenu === "products" ? <FaChevronDown /> : <FaChevronRight />}
                    </button>

                    {/* ✅ Ensure Correct Active State Inside Dropdown */}
                    <div
                        className={`ml-6 mt-2 overflow-hidden transition-all duration-300 ${
                            openMenu === "products" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <Link to="/admin/products"
                            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
                                isActive("/admin/products") ? "bg-blue-600" : "hover:bg-blue-700"
                            }`}
                        >
                            📦 All Products
                        </Link>
                        <Link to="/admin/products/add"
                            className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
                                isActive("/admin/products/add") ? "bg-blue-600" : "hover:bg-blue-700"
                            }`}
                        >
                            ➕ Add Product
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
