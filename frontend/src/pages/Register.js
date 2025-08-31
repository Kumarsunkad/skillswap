import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("✅ Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert("❌ Registration failed: " + err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 to-pink-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Register</h2>

        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Register
        </button>
      </form>
    </div>
  );
}
