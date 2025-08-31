import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-600">⚡ SkillSwap</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <Link to="/matches" className="hover:text-purple-600">Matches</Link>
        <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
        <Link to="/requests" className="hover:text-purple-600">Requests</Link> {/* 👈 New */}
        <Link to="/connections" className="hover:text-purple-600">Connections</Link>
        <Link to="/chat" className="hover:text-purple-600">Chat</Link>
        <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Login
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
    Sign Up
  </Link>
      </div>
    </nav>
  );
}
