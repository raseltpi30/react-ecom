import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLogoutButton from "../AdminLogoutButton";
import { Routes, Route, Navigate } from "react-router-dom";

const Navbar = ({ setIsAdmin }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("admin_auth_token");
        if (!token) return;

        const response = await axios.get("http://127.0.0.1:8000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Admin Panel</div>

      {/* ✅ Display Admin Info Only If Available */}
      {admin ? (
        <div className="text-sm text-gray-700">
          <div className="font-medium">{admin.name}</div>
          <div className="text-xs">{admin.email}</div>
          <div className="text-xs">{admin.role} Admin</div>
        </div>
      ) : (
        <div className="text-xs text-gray-500">Loading...</div>
      )}

      {/* ✅ Logout Button */}
      <div className="flex items-center">
        <AdminLogoutButton setIsAdmin={setIsAdmin} />
      </div>
    </div>
  );
};

export default Navbar;
