import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";

const ManageModules = () => {
  const [modules, setModules] = useState([
    { title: "React Basics", description: "Introduction to React and JSX" },
    { title: "State Management", description: "Handling state with hooks" },
  ]);

  const [form, setForm] = useState({ title: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    const module = modules[index];
    setForm({ title: module.title, description: module.description });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm(`Delete "${modules[index].title}"?`)) {
      const updated = [...modules];
      updated.splice(index, 1);
      setModules(updated);
      if (editingIndex === index) {
        setForm({ title: "", description: "" });
        setEditingIndex(null);
      }
    }
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      return alert("Please fill all fields");
    }

    const updatedModules = [...modules];

    if (editingIndex !== null) {
      updatedModules[editingIndex] = { ...form };
      setEditingIndex(null);
    } else {
      updatedModules.push({ ...form });
    }

    setModules(updatedModules);
    setForm({ title: "", description: "" });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Manage Training Modules
          </h2>

          <form onSubmit={handleAddOrUpdate} className="mb-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="title"
                type="text"
                placeholder="Module Title"
                value={form.title}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
              />
              <input
                name="description"
                type="text"
                placeholder="Module Description"
                value={form.description}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
              >
                {editingIndex !== null ? "Update Module" : "Add New Module"}
              </button>
            </div>
          </form>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-sm uppercase">
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.length > 0 ? (
                modules.map((mod, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {mod.title}
                    </td>
                    <td className="p-4 text-gray-600">{mod.description}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-indigo-600 mr-5 transition"
                        aria-label={`Edit ${mod.title}`}
                      >
                        <FaEdit className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label={`Delete ${mod.title}`}
                      >
                        <FaTrash className="inline mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    No modules available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageModules;
