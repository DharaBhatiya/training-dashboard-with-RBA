import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaChartLine,
  FaTasks,
  FaUsers,
  FaShieldAlt,
  FaLightbulb,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import Footer from "../components/Footer";

const Home = () => {

  const features = [
    {
      icon: FaChalkboardTeacher,
      title: "Role-Based Dashboards",
      description:
        "Personalized dashboards for instructors and trainees to optimize the learning experience.",
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description:
        "Visualize progress, completion rates, and forecast success using modern analytics.",
    },
    {
      icon: FaTasks,
      title: "Smart Module Management",
      description:
        "Instructors can assign modules and track progress in real-time with smart alerts.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Learners", icon: FaUsers },
    { number: "98%", label: "Success Rate", icon: FaStar },
    { number: "24/7", label: "Support", icon: FaShieldAlt },
    { number: "150+", label: "Modules", icon: FaLightbulb },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-hidden">
      <section className="relative bg-blue-950 text-white py-32 px-6 text-center">
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Empower Your <br />
            <span className="text-cyan-400">Training Journey</span>
          </h1>

          <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            A modern training dashboard tailored for instructors and trainees.
            Assign modules, track progress, and elevate your learning.
          </p>

          <Link
            to="/login"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-4 rounded-xl transition duration-300 shadow-lg"
          >
            Get Started <FaArrowRight className="inline ml-2" />
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4 hover:scale-120">
                    <StatIcon className="text-2xl text-cyan-300" />
                  </div>
                  <div className="text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm text-indigo-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why Choose <span className="text-blue-600">Our Platform?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built for modern training workflows—empowering both learners and
              educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-xl shadow-md bg-gray-50 hover:scale-110"
                >
                  <div className="mb-4">
                    <FeatureIcon className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-blue-950 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to <span className="text-cyan-400">Start?</span>
          </h2>
          <p className="text-lg mb-8">
            Sign up now and explore instructor dashboards, module assignment
            tools, and trainee progress tracking.
          </p>
          <Link
            to="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-xl transition duration-300 shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
