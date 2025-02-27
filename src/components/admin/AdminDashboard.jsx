import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminLogoutButton from "./AdminLogoutButton";

const AdminDashboard = ({ setIsAdmin }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("admin_auth_token"); // Get stored auth token
        if (!token) {
          return;
        }
        const response = await axios.get("http://127.0.0.1:8000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Send auth token
          },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-semibold text-center mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded block">Dashboard</Link>
            </li>
            <li className="mb-4">
              <Link to="/users" className="hover:bg-blue-700 p-2 rounded block">Users</Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="hover:bg-blue-700 p-2 rounded block">Settings</Link>
            </li>
            <li className="mb-4">
              <Link to="/reports" className="hover:bg-blue-700 p-2 rounded block">Reports</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-200">
        {/* Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Admin Panel</div>

          {/* Admin Details */}
          {admin ? (
            <div className="text-sm text-gray-700">
              <div className="font-medium">{admin.name}</div>
              <div className="text-xs">{admin.email}</div>
              <div className="text-xs font-semibold text-green-600">
                {admin.role}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500">Loading...</div>
          )}

          <div className="flex items-center">
            <AdminLogoutButton setIsAdmin={setIsAdmin} />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-700">Welcome to the Admin Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Here you can manage users, check reports, and configure settings.
          </p>

          {/* Your Content */}
          <div className="mt-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Total Users</h3>
                <p className="text-2xl">1,230</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Active Orders</h3>
                <p className="text-2xl">54</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Reports Pending</h3>
                <p className="text-2xl">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
