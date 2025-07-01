import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const TraineeDashboard = () => {
  const [modules, setModules] = useState([]);

  const fetchModules = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trainee/modules", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setModules(data);
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  const markComplete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/trainee/complete/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        alert("Module marked as completed");
        fetchModules();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to mark complete");
      }
    } catch (err) {
      console.error("Error updating module:", err);
      alert("Error occurred while updating");
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          My Training Modules
        </h2>

        {modules.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No modules assigned yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div
                key={mod._id}
                className="bg-white rounded-xl p-6 border border-gray-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {mod.moduleId?.title || "Untitled Module"}
                </h3>

                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium mb-4 ${
                    mod.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {mod.completed ? "Completed" : "In Progress"}
                </span>

                {!mod.completed && (
                  <button
                    onClick={() => markComplete(mod._id)}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-sm rounded-md shadow-sm transition duration-200"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TraineeDashboard;
