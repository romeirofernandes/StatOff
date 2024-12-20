import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../assets/players.json";
import { useNavigate } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { Check } from "lucide-react";

function Goals() {
  const [currentScore, setCurrentScore] = useState(0);
  const [player1, setPlayer1] = useState(
    data[Math.floor(Math.random() * data.length)]
  );
  const [player2, setPlayer2] = useState(getRandomPlayer(player1));
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const navigate = useNavigate();

  function getRandomPlayer(excludePlayer) {
    let newPlayer;
    do {
      newPlayer = data[Math.floor(Math.random() * data.length)];
    } while (newPlayer === excludePlayer);
    return newPlayer;
  }

  function handlePlayer1Click() {
    if (player1.goals > player2.goals) {
      setShowCorrect(true);
      setTimeout(() => {
        setCurrentScore(currentScore + 1);
        setPlayer1Wins(player1Wins + 1);
        setPlayer2Wins(0);

        if (player1Wins + 1 === 2) {
          setPlayer1(getRandomPlayer(player2));
          setPlayer1Wins(0);
        } else {
          setPlayer2(getRandomPlayer(player1));
        }
        setShowCorrect(false);
      }, 800);
    } else {
      navigate("/result", {
        state: { score: currentScore, fromPage: "goals" },
      });
    }
  }

  function handlePlayer2Click() {
    if (player1.goals < player2.goals) {
      setShowCorrect(true);
      setTimeout(() => {
        setCurrentScore(currentScore + 1);
        setPlayer2Wins(player2Wins + 1);
        setPlayer1Wins(0);

        if (player2Wins + 1 === 2) {
          setPlayer2(getRandomPlayer(player1));
          setPlayer2Wins(0);
        } else {
          setPlayer1(getRandomPlayer(player2));
        }
        setShowCorrect(false);
      }, 800);
    } else {
      navigate("/result", {
        state: { score: currentScore, fromPage: "goals" },
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#30313D] text-white font-['Poppins']">
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Left Player */}
          <div
            className="flex-1 relative group cursor-pointer w-full"
            onClick={handlePlayer1Click}
          >
            <img
              src={player1.imageUrl}
              alt={player1.name}
              className="w-full h-[250px] md:h-[400px] object-cover rounded-lg brightness-75"
            />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white px-3 py-1 md:px-4 md:py-2 rounded-lg">
              <h2 className="text-black text-lg md:text-2xl font-bold">
                {player1.name}
              </h2>
            </div>
          </div>

          {/* Center OR Section */}
          <div className="flex flex-col items-center gap-2 -my-4 md:my-0">
            <div
              className={`relative bg-white rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center transition-colors duration-300 ${
                showCorrect ? "bg-green-500" : "bg-white"
              }`}
            >
              {showCorrect ? (
                <Check className="text-green-400 w-8 h-8 md:w-12 md:h-12 animate-scale-in" />
              ) : (
                <span className="text-black text-xl md:text-2xl font-bold">
                  OR
                </span>
              )}

              {/* Ripple effect for correct answer */}
              {showCorrect && (
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ripple"></div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-white text-xl font-semibold">
                Score: {currentScore}
              </p>
            </div>
          </div>

          {/* Right Player */}
          <div
            className="flex-1 relative group cursor-pointer w-full"
            onClick={handlePlayer2Click}
          >
            <img
              src={player2.imageUrl}
              alt={player2.name}
              className="w-full h-[250px] md:h-[400px] object-cover rounded-lg brightness-75"
            />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white px-3 py-1 md:px-4 md:py-2 rounded-lg">
              <h2 className="text-black text-lg md:text-2xl font-bold">
                {player2.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-ripple {
          animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default Goals;
