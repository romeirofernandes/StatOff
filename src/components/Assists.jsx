import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../assets/players.json";
import { useNavigate } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { Check } from "lucide-react";

function Assists() {
  const [currentScore, setCurrentScore] = useState(0);
  const [player1, setPlayer1] = useState(
    data[Math.floor(Math.random() * data.length)]
  );
  const [player2, setPlayer2] = useState(getRandomPlayer(player1));
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const navigate = useNavigate();
  const [showCorrect, setShowCorrect] = useState(false);

  function getRandomPlayer(excludePlayer) {
    let newPlayer;
    do {
      newPlayer = data[Math.floor(Math.random() * data.length)];
    } while (newPlayer === excludePlayer);
    return newPlayer;
  }

  function handlePlayer1Click() {
    if (player1.assists > player2.assists) {
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
        state: { score: currentScore, fromPage: "assists" },
      });
    }
  }

  function handlePlayer2Click() {
    if (player1.assists < player2.assists) {
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
        state: { score: currentScore, fromPage: "assists" },
      });
    }
  }
  return (
    <>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Player */}
            <div
              className="flex-1 relative group cursor-pointer"
              onClick={handlePlayer1Click}
            >
              <img
                src={player1.imageUrl}
                alt={player1.name}
                className="w-full h-[400px] object-cover rounded-lg brightness-75"
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg">
                <h2 className="text-black text-2xl font-bold">
                  {player1.name}
                </h2>
              </div>
            </div>

            {/* Center OR Section */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`relative bg-white rounded-full w-24 h-24 flex items-center justify-center transition-colors duration-300 ${
                  showCorrect ? "bg-green-500" : "bg-white"
                }`}
              >
                {showCorrect ? (
                  <Check
                    className="text-green-400 w-12 h-12"
                    style={{
                      animation:
                        "scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                    }}
                  />
                ) : (
                  <span className="text-[#957dad] text-3xl font-bold">OR</span>
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
              className="flex-1 relative group cursor-pointer"
              onClick={handlePlayer2Click}
            >
              <img
                src={player2.imageUrl}
                alt={player2.name}
                className="w-full h-[400px] object-cover rounded-lg brightness-75"
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg">
                <h2 className="text-black text-2xl font-bold">
                  {player2.name}
                </h2>
              </div>
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
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-ripple {
          animation: ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </>
  );
}

export default Assists;
