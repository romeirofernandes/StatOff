import React from "react";
import { Link } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { useEffect, useState } from "react";

function Category() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-[#30313D] text-white font-['Poppins']">
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(149, 125, 173, 0.18), transparent 40%)`,
          }}
        />
        <header className="flex justify-between items-center px-6 py-4">
          <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={MyLogo} alt="StatOff Logo" className="w-9 h-9" />
              <span className="font-['Bricolage_Grotesque'] font-bold text-xl text-[#fff]">
                StatOff
              </span>
            </div>
            <Link to="/">
              <button className="px-4 font-medium py-2 bg-[#957DAD] text-[#FFFFFF] rounded-lg font-['Poppins']">
                Home
              </button>
            </Link>
          </div>
        </header>

        <div className="border-b border-[#fff] w-full opacity-20"></div>

        <main className="max-w-lg mx-auto px-6 min-h-[calc(100vh-80px)] flex flex-col justify-center">
          <div className="py-10">
            <h1 className="text-4xl font-['Bricolage_Grotesque'] font-bold text-center text-[#fff] mb-8">
              Pick a category
            </h1>

            <div className="grid grid-rows-1 md:grid-rows-3 gap-6">
              {["Goals", "Assists", "Appearances"].map((category) => (
                <Link
                  key={category}
                  to={`/${category.toLowerCase()}`}
                  className="h-24 px-8 py-4 bg-[#957DAD] rounded-lg font-medium text-center transition-all duration-300 hover:bg-opacity-90 hover:shadow-xl hover:scale-105 text-xl flex items-center justify-center text-[#FFFFFF]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Category;
