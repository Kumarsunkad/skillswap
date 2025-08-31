import { useEffect, useState } from "react";
import axios from "axios";

export default function Connections() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/request/connections", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConnections(res.data);
      } catch (err) {
        console.error(err);
        alert("⚠️ Please login again");
        window.location.href = "/login";
      }
    };
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No connections yet 🤝 — accept some requests!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">🤝 My Connections</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {connections.map((conn) => {
          // figure out "other" user
          const tokenUserId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;
          const otherUser = conn.from._id === tokenUserId ? conn.to : conn.from;

          return (
            <div
              key={conn._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${otherUser.name}`}
                  alt="avatar"
                  className="w-12 h-12 rounded-full shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold">{otherUser.name}</h3>
                  <p className="text-gray-500 text-sm">{otherUser.email}</p>
                </div>
              </div>

              {/* Chat Button */}
              <button
  onClick={() => {
    localStorage.setItem("chatUser", otherUser.name);  // the partner
    localStorage.setItem("chatUserId", otherUser._id); // partner ID
    window.location.href = "/chat";
  }}
  className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
>
  Chat 💬
</button>

            </div>
          );
        })}
      </div>
    </div>
  );
}
