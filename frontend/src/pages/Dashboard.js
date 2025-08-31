import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsNeeded, setSkillsNeeded] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setSkillsOffered(res.data.skillsOffered);
        setSkillsNeeded(res.data.skillsNeeded);
      } catch (err) {
        console.error(err);
        alert("⚠️ Please login again");
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        { skillsOffered, skillsNeeded },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setShowModal(false);
    } catch (err) {
      alert("❌ Update failed: " + err.response.data.message);
    }
  };

  if (!user) return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">👤 My Dashboard</h2>

        <div className="flex items-center space-x-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <div>
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-gray-700">⚡ Credits</h4>
          <p className="text-xl font-bold text-purple-600">{user.credits}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-xl shadow-md">
            <h4 className="font-bold text-purple-700 mb-2">✅ Skills Offered</h4>
            {user.skillsOffered.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {user.skillsOffered.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl shadow-md">
            <h4 className="font-bold text-blue-700 mb-2">❓ Skills Needed</h4>
            {user.skillsNeeded.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {user.skillsNeeded.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-purple-600">Edit Profile</h3>

            <label className="block mb-2 font-semibold">Skills Offered</label>
            <input
              type="text"
              value={skillsOffered.join(", ")}
              onChange={(e) => setSkillsOffered(e.target.value.split(","))}
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              placeholder="e.g., C++, React, Photoshop"
            />

            <label className="block mb-2 font-semibold">Skills Needed</label>
            <input
              type="text"
              value={skillsNeeded.join(", ")}
              onChange={(e) => setSkillsNeeded(e.target.value.split(","))}
              className="w-full px-3 py-2 mb-4 border rounded-lg"
              placeholder="e.g., UI Design, Video Editing"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
