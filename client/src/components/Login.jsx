import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token); // Store JWT token
        alert("Login successful!");
        navigate("/Dashboard"); // Redirect to home page
      }
    } catch (error) {
      console.error("Login error", error);
      setError(error.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 shadow-xl rounded-xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center">
          Welcome Back!
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-purple-700">Email</label>
            <input
              type="email"
              placeholder="youremail@example.com"
              className="w-full p-4 mt-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-purple-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-4 mt-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Log In
          </button>

          <div className="text-center mt-4 text-sm text-purple-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-700 hover:text-purple-800 font-medium">
              Sign up
            </a>
          </div>

          <div className="text-center mt-4 text-sm text-purple-600">
            <a href="/" className="text-purple-700 hover:text-purple-800 font-medium">
              Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
