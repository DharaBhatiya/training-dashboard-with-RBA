import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Footer from "../components/Footer";

const AssignModules = () => {
  const [trainees, setTrainees] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/instructor/trainees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setTrainees(data);
      } catch (err) {
        console.error("Failed to fetch trainees", err);
      }
    };

    const fetchModules = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/modules", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setModules(data);
      } catch (err) {
        console.error("Failed to fetch modules", err);
      }
    };

    fetchTrainees();
    fetchModules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrainee || !selectedModuleId) {
      return alert("Please select both trainee and module");
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/instructor/assign-module",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            traineeId: selectedTrainee,
            moduleId: selectedModuleId,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Module assigned successfully!");
        setSelectedTrainee("");
        setSelectedModuleId("");
      } else {
        alert(result.message || "Failed to assign module");
      }
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Error assigning module");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 justify-center">
            <FaUserPlus className="text-blue-600 text-4xl" />
            Assign Training Module
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Trainee
              </label>
              <select
                value={selectedTrainee}
                onChange={(e) => setSelectedTrainee(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a Trainee</option>
                {trainees.map((trainee) => (
                  <option key={trainee._id} value={trainee._id}>
                    {trainee.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Module
              </label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a Module</option>
                {modules.map((module) => (
                  <option key={module._id} value={module._id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition duration-200 shadow-md"
            >
              Assign Module
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssignModules;
