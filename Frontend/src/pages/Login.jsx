import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("userId", data.user._id);

      alert("Login successful!");

      if (data.user.role === "trainee") {
        navigate("/trainee-dashboard");
      } else if (data.user.role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-[350px] bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            Login
          </h2>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
            required
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-3">{error}</p>
          )}

          <p className="text-sm text-center mt-5 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Login;
