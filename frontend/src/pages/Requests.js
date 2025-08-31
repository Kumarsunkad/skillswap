import { useEffect, useState } from "react";
import axios from "axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/request/received", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        alert("⚠️ Please login again");
        window.location.href = "/login";
      }
    };
    fetchRequests();
  }, []);

  const handleResponse = async (requestId, action) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/request/respond",
        { requestId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ " + res.data.message);
      setRequests(requests.filter((req) => req._id !== requestId));
    } catch (err) {
      alert("❌ " + err.response?.data?.message || "Error responding to request");
    }
  };

  if (requests.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No incoming requests right now 📭
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">📩 Incoming Requests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${req.from?.name}`}
                alt="avatar"
                className="w-12 h-12 rounded-full shadow-sm"
              />
              <div>
                <h3 className="text-lg font-semibold">{req.from?.name}</h3>
                <p className="text-gray-500 text-sm">{req.from?.email}</p>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-bold text-purple-700">✅ Offers:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {(req.from?.skillsOffered || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-bold text-blue-700">❓ Needs:</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {(req.from?.skillsNeeded || []).map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleResponse(req._id, "accepted")}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Accept ✅
              </button>
              <button
                onClick={() => handleResponse(req._id, "rejected")}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Reject ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
