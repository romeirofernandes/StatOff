import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { db } from "../firebase"; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // For Firestore functionality

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData); // Add this line to see the data being submitted

    try {
      // Save feedback to Firestore
      await addDoc(collection(db, "feedback"), formData);
      alert("Feedback sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error sending feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#30313D]">
      {/* Background animation */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(149, 125, 173, 0.18), transparent 40%)`,
        }}
      />
      <header className="flex justify-between items-center px-6 py-4">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <img src={MyLogo} alt="StatOff Logo" className="w-9 h-9" />
              <span className="font-['Bricolage_Grotesque'] font-bold text-xl text-[#fff]">
                StatOff
              </span>
            </div>
          </Link>
          <Link to="/">
            <button className="px-4 font-medium py-2 bg-[#957dad] text-white rounded-lg font-['Poppins']">
              Home
            </button>
          </Link>
        </div>
      </header>

      <div className="border-b border-[#fff] w-full opacity-20"></div>

      <main className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-['Bricolage_Grotesque'] font-bold mb-8 text-white text-center">
          I'd love to hear from you
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#f2f2f2] shadow-md rounded-lg p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-[#30313D] font-['Poppins'] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#957dad]"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-[#30313D] font-['Poppins'] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#957dad]"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-[#30313D] font-['Poppins'] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg font-['Poppins'] resize-none focus:outline-none focus:ring-2 focus:ring-[#957dad]"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#957dad] text-white font-['Poppins'] font-medium py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </main>
      <div className="border-b border-[#fff] w-full opacity-20"></div>
      <footer className="flex justify-between items-center px-6 py-4 ">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <div className="text-white font-['Bricolage_Grotesque'] text-lg font-medium">
            Romeiro Fernandes
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/romeirofernandes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 text-[#957dad]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/theromeirofernandes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 text-[#957dad]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.980-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://x.com/theromeirofern/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-5 h-5 text-[#957dad]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
