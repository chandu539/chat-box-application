import React from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { selectedUser } = useChatStore();

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
    <div className="min-h-screen bg-purple-100">
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

      {/* Main Content */}
      <div className="h-screen bg-purple-100">
        <div className="flex items-center justify-center pt-10 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
