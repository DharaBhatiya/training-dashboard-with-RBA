import React, { useEffect, useState } from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import Footer from "../components/Footer";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUsername(data.name || ""); 
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: username, password: newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        localStorage.setItem("name", username);
        setNewPassword("");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Error updating profile");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded-2xl w-full max-w-md p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-blue-600 text-6xl mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">Update Profile</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <FaUserCircle className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
