import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <>
        <section className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-[350px] bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-4 px-3 py-2 border rounded-xl"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border rounded-xl"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded-xl"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded-xl"
          required
        >
          <option value="">Select Role</option>
          <option value="trainee">Trainee</option>
          <option value="instructor">Instructor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl"
        >
          Sign Up
        </button>

        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
    <Footer/>
    </>
  );
};

export default Register;
