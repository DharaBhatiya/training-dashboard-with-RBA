import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const InstructorDashboard = () => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.log("Fetched trainees:", data);

        if (!res.ok) throw new Error(data.message || "Error fetching trainees");

        setTrainees(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch trainees:", err.message);
        setTrainees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <FaUserGraduate className="text-4xl text-blue-600" />
            Instructor Dashboard
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 text-lg py-10">
              Loading trainees...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
                <thead className="bg-blue-600 text-white text-sm uppercase">
                  <tr>
                    <th className="py-3 px-6 text-left">Trainee Name</th>
                    <th className="py-3 px-6 text-left">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {trainees && trainees.length > 0 ? (
                    trainees.map((trainee, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-200 transition duration-200"
                      >
                        <td className="py-3 px-6 font-medium text-gray-800">
                          {trainee.name || "Unnamed Trainee"}
                        </td>
                        <td className="py-3 px-6 text-blue-600 font-semibold">
                          {trainee.progress !== undefined
                            ? trainee.progress
                            : "0%"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-6 text-gray-500"
                      >
                        No trainees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/assign-modules")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
            >
              Assign New Modules
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorDashboard;
