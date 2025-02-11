import React, { useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import 'aos/dist/aos.css';

const LogoutButton = ({ setIsLoggedIn }) => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
    AOS.refresh();
  })
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("auth_token"); // Remove token from storage
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <button
        data-aos="zoom-in"
        data-aos-delay="100"
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
