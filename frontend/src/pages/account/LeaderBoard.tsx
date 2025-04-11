import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Modal } from "@/components/ui/checkoutmodal";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import ChampionsCup from "../../assets/svg/image 67leader-board.svg";
import Conffeti from "../../assets/svg/image 68leader-board.svg";
import { convertToReadableTime } from "@/lib/utils";
import { Link } from "react-router-dom";
import { boolean } from "zod";
import { Button } from "@/components/ui/button";

// Function to generate random learners
const generateLearner = (serialNumber, rank) => {
  const randomPoints = Math.floor(Math.random() * (100 - 0 + 1)) + 0; // Random points between 25 and 5000

  // List of sample first names and last names for more variety
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "Eva",
    "Sophia",
    "Max",
    "Liam",
    "Olivia",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Jones",
    "Miller",
    "Davis",
    "García",
    "Martínez",
  ];

  // Function to generate random names
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  // Generating random username
  const randomUsername = `${randomFirstName} ${randomLastName}`;

  // Randomly generating isActive state (50% chance of being true or false)
  const isActive = Math.random() > 0.8;

  return {
    serialNumber,
    username: randomUsername, // Randomized username
    rank,
    points: randomPoints,
    zone: "", // Zone will be assigned later
    isActive: false,
  };
};

const LeaderBoard = () => {
  const [learners, setLearners] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [activeRank, setActiveRank] = useState("Rookie");
  const [showModal, setShowModal] = useState(true);
  const buttonLabels = [
    "Rookie",
    "Pro",
    "Ace",
    "Star",
    "Elite",
    "Unstoppable",
    "Champion",
    "Titan",
  ];

  // Check if there's an existing countdown in localStorage
  let targetDate = localStorage.getItem("targetDate");

  if (!targetDate) {
    // If there's no target date in localStorage, set it to 3 days ahead
    const currentDate = new Date();
    targetDate = new Date(currentDate);
    targetDate?.setDate(currentDate.getDate() + 3);
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

    // Assign random active state to each learner
    allLearners.forEach((learner) => {
      learner.isActive = Math.random() > 0.5; // Randomly set true or false
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
        <CardContent className="px-0">
          <CardHeader className="items-start flex">
            <div className="flex text-lg justify-between w-full gap-3">
              <h3 className="flex font-bold">Leaderboard</h3>
              <h5 className="flex font-bold text-red">
                Ends in {timeRemaining}
              </h5>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 items-center flex flex-col">
            <Link
              to="/courses"
              className=" px-4 py-2 w-full text-black bg-gray-100 text-sm rounded-lg ring-2 ring-gray-200 flex items-center justify-between"
            >
              <p>Explore more courses</p>
              <ArrowRight className="w-4" />
            </Link>
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
                body={
                  <Button className="mt-4" onClick={() => onClose && onClose()}>
                    Claim <ArrowRight />
                  </Button>
                }
              />
            )}

            {/* Rank Selection Buttons */}
            <div className="flex gap-2 w-full overflow-x-auto items-start rounded-lg relative scrollbar-hide">
              {buttonLabels.map((rank) => (
                <button
                  key={rank}
                  onClick={() => handleRankClick(rank)}
                  // disabled={activeRank !== rank} // Disable the button for other ranks
                  className={`px-4 py-2 rounded-md font-semibold ${
                    activeRank !== rank
                      ? "bg-gray-100 text-gray-400 " // Disabled style for current rank
                      : "bg-red text-white"
                  }`}
                >
                  {rank}
                </button>
              ))}
            </div>

            {/* Displaying learners based on selected rank */}
            <div className="w-full flex flex-col gap-3 items- center">
              {/* Group learners by zone */}
              {["promotion", "repetition", "demotion"].map((zone) => {
                const learnersInZone = filteredLearners.filter(
                  (learner) => learner.zone === zone
                );

                if (learnersInZone.length === 0) return null; // Don't render if there are no learners in this zone

                return (
                  <div key={zone}>
                    <h5
                      className={`flex items-start font-normal justify-center ${
                        zone === "promotion"
                          ? "text-green-600"
                          : zone === "repetition"
                          ? "text-gray-500"
                          : "text-red-600"
                      } font-black`}
                    >
                      {zone === "promotion"
                        ? "Promotion Zone"
                        : zone === "repetition"
                        ? "Repetition Zone"
                        : "Demotion Zone"}
                    </h5>

                    {learnersInZone.map((learner, index) => (
                      <div
                        key={learner.serialNumber}
                        className={`w-full flex mt-1 border rounded-xl py-2 px-5 relative ${
                          zone === "promotion"
                            ? "bg-green-200/10 border-green-300" // Green for promotion zone
                            : zone === "repetition"
                            ? "bg-gray-200/10 border-gray-300" // Gray for repetition zone
                            : "bg-red-200/10 border-red-300" // Red for demotion zone
                        }`}
                      >
                        <div className="flex flex-col w-full ">
                          <div className="flex justify-between text-xs md:text-base">
                            <div className="flex items-center gap-3">
                              <p>{index + 1}</p>
                              <p className="relative flex px-[10px] items-start">
                                {learner.username}{" "}
                                {learner.isActive && (
                                  <div className="w-2 h-2 top-0 right-0 absolute rounded-full bg-green-600"></div>
                                )}
                              </p>
                            </div>
                            <p className="text-gray-700 font-bold text-base items-center md:text-2xl flex gap-1">
                              {learner.points}{" "}
                              <span className="text-sm font-normal text-gray-400">
                                Points
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderBoard;
