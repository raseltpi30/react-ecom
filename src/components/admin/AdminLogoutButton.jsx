import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogoutButton = ({ setIsAdmin }) => {
  const navigate = useNavigate();

   const handleLogout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Logout!"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("admin_auth_token");
          setIsAdmin(false);
          navigate("/admin/login");
          Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
        }
      });
    };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default AdminLogoutButton;
