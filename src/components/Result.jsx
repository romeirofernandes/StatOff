import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MyLogo from "../assets/logo2.svg";
import { useEffect, useState } from "react";

function Result() {
  const location = useLocation();
  const fromPage = location.state?.fromPage;
  const { score } = location.state || { score: 0 };

  let redirectTo;
  if (fromPage === "goals") {
    redirectTo = "/goals";
  } else if (fromPage === "assists") {
    redirectTo = "/assists";
  } else if (fromPage === "appearances") {
    redirectTo = "/appearances";
  }

  const lowScoreMessages = [
    "Relegation form. Quick hit play again and we can pretend that never happened!",
    "Even my grandma who doesn't watch football could do better!",
    "Did you answer with your eyes closed?",
    "Time to hang up those virtual boots mate!",
    "Stats? More like splats! Try again!",
    "You might want to stick to watching paint dry...",
  ];

  const midScoreMessages = [
    "Not bad, but not great - just like Arsenal's trophy cabinet!",
    "Middle of the table mediocrity at its finest!",
    "You're the human equivalent of a mid-table finish!",
    "Decent effort, but Messi wouldn't be sweating!",
    "The participation trophy is yours!",
    "You're like a substitute - showing promise but not quite there yet!",
  ];

  const highScoreMessages = [
    "Are you secretly Opta in disguise?",
    "Pep Guardiola wants to know your location!",
    "Stats don't lie, and neither do you - Incredible!",
    "Champions League material right here!",
    "Your football knowledge is sharper than a VAR offside call!",
    "Even Arsène Wenger saw that performance!",
  ];
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

        <main className="max-w-6xl mx-auto px-6 py-10 text-center relative">
          <div className="flex flex-col space-y-8 justify-center items-center">
            <h2 className="text-3xl font-semibold">You scored:</h2>
            <div className="inline-block bg-white text-black/90 text-7xl w-1/6 font-bold py-4 px-8 rounded-lg shadow-lg">
              {score}
            </div>

            <div className="bg-black/40 backdrop-blur-sm py-3 px-6 rounded-lg inline-block mx-auto relative">
              <p className="text-xl">
                {score < 10
                  ? lowScoreMessages[
                      Math.floor(Math.random() * lowScoreMessages.length)
                    ]
                  : score <= 20
                  ? midScoreMessages[
                      Math.floor(Math.random() * midScoreMessages.length)
                    ]
                  : highScoreMessages[
                      Math.floor(Math.random() * highScoreMessages.length)
                    ]}
              </p>
            </div>

            <div className="flex flex-col gap-6 max-w-md mx-auto mt-12">
              <Link
                to={redirectTo}
                className="w-full px-6 py-4 bg-[#957dad] rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:shadow-lg hover:scale-105 text-md"
              >
                Play again!
              </Link>
              <Link
                to="/category"
                className="w-full px-6 py-4 bg-[#957dad] rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:shadow-lg hover:scale-105 text-md"
              >
                Other Categories
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Result;
