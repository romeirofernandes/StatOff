import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { Trophy, TrendingUp, Users } from "lucide-react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#30313D] relative overflow-hidden">
      {/* Cursor gradient effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(149, 125, 173, 0.18), transparent 40%)`,
        }}
      />

      <header className="flex justify-between items-center px-6 py-4 relative z-10">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={MyLogo} alt="StatOff Logo" className="w-9 h-9" />
            <span className="font-['Bricolage_Grotesque'] font-bold text-xl text-[#fff]">
              StatOff
            </span>
          </div>
          <Link to="/contact">
            <button className="px-4 font-medium py-2 bg-[#957DAD] text-[#FFFFFF] rounded-lg font-['Poppins'] hover:bg-opacity-90 transition-all duration-300">
              Feedback
            </button>
          </Link>
        </div>
      </header>

      <div className="border-b border-[#fff] w-full opacity-20"></div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-16">
          {/* Hero Section */}
          <div className="space-y-8">
            <h1 className="text-6xl font-['Bricolage_Grotesque'] font-bold text-[#fff]">
              <span className="inline-block animate-float">
                Test your ball knowledge
              </span>
            </h1>
            <p className="text-[#fff] text-lg  opacity-90 max-w-xl mx-auto">
              Through an interactive game that compares your favorite EPL
              Legends.
            </p>
            <Link
              to="/category"
              className="inline-block px-8 py-4 bg-[#957DAD] text-[#FFFFFF] rounded-lg font-['Poppins'] hover:bg-opacity-90 transition-all duration-300 hover:transform hover:scale-105 font-semibold text-lg"
            >
              Start Playing
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <Trophy className="w-12 h-12 text-[#957DAD] mb-4" />
              <h3 className="text-[#fff] text-xl font-semibold mb-2">Goals</h3>
              <p className="text-[#fff] opacity-75">
                Compare goal-scoring records of Premier League legends
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-12 h-12 text-[#957DAD] mb-4" />
              <h3 className="text-[#fff] text-xl font-semibold mb-2">
                Assists
              </h3>
              <p className="text-[#fff] opacity-75">
                Test your knowledge of the league's top playmakers
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <Users className="w-12 h-12 text-[#957DAD] mb-4" />
              <h3 className="text-[#fff] text-xl font-semibold mb-2">
                Appearances
              </h3>
              <p className="text-[#fff] opacity-75">
                Compare players' Premier League appearances
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
