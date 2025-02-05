import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("authToken");

  if (!token) {
    navigate("/login");
    return null;
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-6">
          <a href="/profile" className="hover:text-gray-300">Profile</a>
          <a href="/settings" className="hover:text-gray-300">Settings</a>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
