import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Chatbox App</h1>
      <p className="text-lg mb-6">Connect and chat with your friends instantly!</p>
      <div className="space-x-4">
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg">Log In</Link>
      </div>
    </div>
  );
}

export default Home;
