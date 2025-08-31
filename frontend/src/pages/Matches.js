import { useEffect, useState } from "react";
import axios from "axios";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/match/find", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error(err);
        alert("⚠️ Please login again");
        window.location.href = "/login";
      }
    };
    fetchMatches();
  }, []);

  const handleSendRequest = async (toUserId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/request/send",
        { toUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ " + res.data.message);
    } catch (err) {
      alert("❌ " + err.response.data.message);
    }
  };

  if (matches.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No matches found 😢 — try updating your profile!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">🎯 Your Matches</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {matches.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}`}
                alt="avatar"
                className="w-12 h-12 rounded-full shadow-sm"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-bold text-purple-700">✅ Offers:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {user.skillsOffered.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-bold text-blue-700">❓ Needs:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {user.skillsNeeded.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSendRequest(user._id)}
              className="w-full mt-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Send Request 🤝
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
