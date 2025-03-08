import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminLoginForm = ({ setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track the loading state
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Track where the user came from

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
    return () => AOS.refresh();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        email,
        password,
      });

      const { admin_access_token, message, role } = response.data;

      // ✅ Update localStorage
      localStorage.setItem("admin_auth_token", admin_access_token);
      localStorage.setItem("role", role);

      toast.success(message || "Login successful!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        setIsAdmin(true); // Update isAdmin state immediately
        const redirectTo = location.state?.from?.pathname || "/admin/products";
        navigate(redirectTo);
      }, 3000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "An unexpected error occurred. Please try again.",
        { position: "top-right", autoClose: 2000 }
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />

      <form
        data-aos="zoom-in"
        data-aos-delay="100"
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading} // Disable the button when loading
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/admin/register")}
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
