import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Modal } from "@/components/ui/checkoutmodal";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import ChampionsCup from "../../assets/svg/image 67leader-board.svg";
import Conffeti from "../../assets/svg/image 68leader-board.svg";
import { convertToReadableTime } from "@/lib/utils";

// Function to generate random learners
const generateLearner = (serialNumber, rank) => {
  const randomPoints = Math.floor(Math.random() * (5000 - 25 + 1)) + 25; // Random points between 25 and 5000
  return {
    serialNumber,
    username: `@User${serialNumber}`, // Username based on serial number
    rank,
    points: randomPoints,
    zone: "", // Zone will be assigned later
  };
};

const LeaderBoard = () => {
  const [learners, setLearners] = useState([]);
  const [isWinner, setIsWinner] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [activeRank, setActiveRank] = useState("Newbie");
  const [activeButton, setActiveButton] = useState(activeRank);
  const [showModal, setShowModal] = useState(false);
  const buttonLabels = [
    "Newbie",
    "Rookie",
    "Star",
    "Ace",
    "Pro",
    "Elite",
    "Champion",
    "Legend",
    "Titan",
    "Icon",
    "Hero",
    "Emperor",
    "Supreme",
    "Unstoppable",
    "Mastermind",
  ];

  // Check if there's an existing countdown in localStorage
  let targetDate = localStorage.getItem("targetDate");

  if (!targetDate) {
    // If there's no target date in localStorage, set it to 3 days ahead
    const currentDate = new Date();
    targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 3);
    localStorage.setItem("targetDate", targetDate);
  } else {
    // If target date exists in localStorage, convert it to a Date object
    targetDate = new Date(targetDate);
  }

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;
      if (timeDifference <= 0) {
        setTimeRemaining("The event has ended!");
        clearInterval(countdownInterval);
      } else {        
        setTimeRemaining(convertToReadableTime(timeDifference));
      }
    };
    const countdownInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownInterval); // Cleanup on component unmount
  }, [targetDate]);

  const handleRankClick = (rank) => {
    if (rank !== activeRank) {
      setActiveRank(rank);
    }
  };

  useEffect(() => {
    const allLearners = [];
    buttonLabels.forEach((rank, index) => {
      for (let i = 0; i < 10; i++) {
        allLearners.push(generateLearner(i + 1 + index * 10, rank));
      }
    });

    // Get the highest and lowest points to calculate thresholds
    const highestPoints = Math.max(
      ...allLearners.map((learner) => learner.points)
    );
    const lowestPoints = Math.min(
      ...allLearners.map((learner) => learner.points)
    );

    // Calculate thresholds based on points
    const demotionThreshold =
      lowestPoints + (highestPoints - lowestPoints) * 0.3;
    const promotionThreshold =
      lowestPoints + (highestPoints - lowestPoints) * 0.7;

    // Assign zones based on points
    allLearners.forEach((learner) => {
      if (learner.points >= promotionThreshold) {
        learner.zone = "promotion";
      } else if (learner.points >= demotionThreshold) {
        learner.zone = "repetition";
      } else {
        learner.zone = "demotion";
      }
    });

    setLearners(allLearners);
  }, []);

  // Filter learners based on the selected rank
  const filteredLearners = learners.filter(
    (learner) => learner.rank === activeRank
  );

  const closeModal = (open: boolean) => {
    setShowModal(open);
  };

  // Automatically trigger modal for number 1 spot after the countdown
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const timeDifference = targetDate - now;
      return timeDifference;
    };

    const timer = setTimeout(() => {
      const topLearner = learners.sort((a, b) => b.points - a.points)[0];
      if (topLearner) {
        setShowModal(true);
      }
    }, calculateTimeRemaining()); // Use the time remaining until the target date

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [learners, targetDate]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <Card className="px-0 rounded-none bg-inherit border-0 w-full min-w-full lg:min-w-[70%] md:min-w-[90%] lg:w-[70%] md:w-[90%]">
        <CardContent className="px-[0.5px]">
          <CardHeader className="items-start flex">
            <div className="flex text-lg justify-between w-full gap-3">
              <h2 className="flex font-bold">Leaderboard</h2>
              <h2 className="flex font-bold text-red text-2xl">
                {timeRemaining}
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 items-center flex flex-col">
            <div className=" px-4 py-1 w-full text-white text-sm rounded-lg bg-red bg-gradient-to-r from-red to-black flex items-center justify-between">
              <p>Explore more courses</p>
              <ArrowRight className="w-4" />
            </div>
            {/* Conditionally render the modal for the winner */}
            {showModal && (
              <Modal
                trigger={null}
                isOpen={showModal}
                onClose={closeModal}
                header={
                  <div className="relative w-full">
                    <img src={Conffeti} alt="" />
                    <img
                      src={ChampionsCup}
                      alt=""
                      className="absolute top-6 w-full h-24"
                    />
                    <p className="text-red text-lg font-thin">
                      HUGE Congratulations!
                    </p>
                  </div>
                }
                description={
                  <p>
                    You’ve reached the top of the leaderboard and won a 70%
                    Discount on your next course purchase. Your hard work and
                    dedication have paid off, and we’re thrilled to recognize
                    your achievement.
                  </p>
                }
              />
            )}

            {/* Rank Selection Buttons */}
            <div className="flex gap-2 w-full overflow-x-auto items-start border-gray-300 border rounded-xl px-3 py-1 relative scrollbar-hide">
              {buttonLabels.map((rank) => (
                <button
                  key={rank}
                  onClick={() => handleRankClick(rank)}
                  disabled={activeRank !== rank} // Disable the button for other ranks
                  className={`px-4 py-2 rounded-md font-semibold ${activeRank !== rank
                      ? "bg-gray-200 text-gray-400 " // Disabled style for current rank
                      : "bg-red text-white"
                    }`}
                >
                  {rank}
                </button>
              ))}
            </div>

            {/* Displaying learners based on selected rank */}
            <div className="w-full flex flex-col gap-3 items-center">
              {/* Display learners in different zones */}
              <h5 className="flex items-center text-green-600 font-black">
                Promotion Zone
              </h5>
              {filteredLearners
                .filter((learner) => learner.zone === "promotion")
                .map((learner, index) => (
                  <div
                    key={learner.serialNumber}
                    className="w-full flex gap-2 items-start border-2 rounded-xl p-3 relative"
                  >
                    <div className="flex flex-col gap- w-full font-bold">
                      <div className="flex justify-between text-xs md:text-base">
                        <div className="flex items-center gap-3">
                          <p className="text-lg">{index + 1}</p>
                          <p>{learner.username}</p>
                        </div>
                        <p className="text-black text-lg md:text-2xl flex gap-2">
                          {learner.points} points
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              <h5 className="flex items-center text-gray-500 font-black">
                Repetition Zone
              </h5>
              {filteredLearners
                .filter((learner) => learner.zone === "repetition")
                .map((learner, index) => (
                  <div
                    key={learner.serialNumber}
                    className="w-full flex gap-2 items-start border-2 rounded-xl p-3 relative"
                  >
                    <div className="flex flex-col gap- w-full font-bold">
                      <div className="flex justify-between text-xs md:text-base">
                        <div className="flex items-center gap-3">
                          <p className="text-lg">{index + 1}</p>
                          <p>{learner.username}</p>
                        </div>
                        <p className="text-black text-lg md:text-2xl flex gap-2">
                          {learner.points} points
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              <h5 className="flex items-center text-red-600 font-black">
                Demotion Zone
              </h5>
              {filteredLearners
                .filter((learner) => learner.zone === "demotion")
                .map((learner, index) => (
                  <div
                    key={learner.serialNumber}
                    className="w-full flex gap-2 items-start border-2 rounded-xl p-3 relative"
                  >
                    <div className="flex flex-col gap- w-full font-bold">
                      <div className="flex justify-between text-xs md:text-base">
                        <div className="flex items-center gap-3">
                          <p className="text-lg">{index + 1}</p>
                          <p>{learner.username}</p>
                        </div>
                        <p className="text-black text-lg md:text-2xl flex gap-2">
                          {learner.points} points
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderBoard;
