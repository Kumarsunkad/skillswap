import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
     localStorage.setItem("token", res.data.token);
localStorage.setItem("userId", res.data.user._id);   // 👈 must be saved
localStorage.setItem("userName", res.data.user.name);

      alert("✅ Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("❌ Login failed: " + err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Login</h2>

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
          Login
        </button>
      </form>
    </div>
  );
}
