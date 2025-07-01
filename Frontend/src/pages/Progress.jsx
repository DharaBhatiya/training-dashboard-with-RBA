import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Progress = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trainee/modules", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setModules(data);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    fetchModules();
  }, []);

  const completedModules = modules.filter((mod) => mod.completed).length;
  const totalModules = modules.length;
  const pendingModules = totalModules - completedModules;
  const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const handleMarkComplete = async (moduleId) => {
    try {
      const res = await fetch("http://localhost:5000/api/modules/mark-complete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ moduleId }),
      });

      if (!res.ok) throw new Error("Failed to mark complete");

      const updatedModule = await res.json();

      setModules((prev) =>
        prev.map((mod) => (mod._id === updatedModule._id ? updatedModule : mod))
      );
    } catch (error) {
      console.error("Error marking module as completed:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Training Progress</h2>

          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-300"
                strokeWidth="3.8"
                fill="none"
                stroke="currentColor"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600"
                strokeWidth="3.8"
                fill="none"
                strokeDasharray={`${progressPercent}, 100`}
                stroke="currentColor"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-700">
              {Math.round(progressPercent)}%
            </div>
          </div>

          <div className="space-y-2 text-gray-700 text-lg font-medium mb-8">
            <p>
              Completed Modules:{" "}
              <span className="text-green-700 font-bold">{completedModules}</span>
            </p>
            <p>
              Pending Modules:{" "}
              <span className="text-yellow-700 font-bold">{pendingModules}</span>
            </p>
            <p>
              Total Modules:{" "}
              <span className="text-blue-700 font-bold">{totalModules}</span>
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Modules</h3>
            <ul className="space-y-4">
              {modules.map((mod) => (
                <li
                  key={mod._id}
                  className="bg-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold text-blue-700">
                      {mod.moduleId?.title || "Untitled Module"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={
                          mod.completed
                            ? "text-green-700 font-bold"
                            : "text-yellow-700 font-semibold"
                        }
                      >
                        {mod.completed ? "Completed" : "Pending"}
                      </span>
                    </p>
                  </div>
                  {!mod.completed && (
                    <button
                      onClick={() => handleMarkComplete(mod._id)}
                      className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm transition"
                    >
                      Mark Complete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Keep going! You're making great progress
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Progress;
