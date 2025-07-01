import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Training Portal</h3>
          <p className="text-sm">
            Empowering instructors and trainees through structured, smart
            learning.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Training Management Portal. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
