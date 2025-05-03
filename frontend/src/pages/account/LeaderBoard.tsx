import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { tempLeaderboard, currentUserEntry } from "@/constants/temp";

interface LeaderboardEntry {
  userId: string;
  username: string;
  profileImage: string;
  score: number;
  level: number;
  rank: string;
  xp: number;
  completedCourses: number;
  quizAccuracy: number;
  streak: number;
  lastActive: Date;
}

interface Leaderboard {
  id: string;
  type: string;
  title: string;
  entries: LeaderboardEntry[];
  status: string;
  startDate: Date;
  endDate: Date;
}

const LeaderBoard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRank, setSelectedRank] = useState<string>("all");
  const [leaderboard, setLeaderboard] = useState<Leaderboard>(tempLeaderboard);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry>(currentUserEntry);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Calculate time left until leaderboard ends
    const calculateTimeLeft = () => {
      const endDate = new Date(leaderboard.endDate);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        return "Leaderboard ended";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}d ${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [leaderboard.endDate]);

  const filteredEntries = leaderboard.entries.filter((entry) => {
    if (selectedRank === "all") return true;
    return entry.rank.toLowerCase() === selectedRank.toLowerCase();
  });

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "pro":
        return "bg-purple-500";
      case "ace":
        return "bg-blue-500";
      case "star":
        return "bg-green-500";
      case "elite":
        return "bg-yellow-500";
      case "unstoppable":
        return "bg-orange-500";
      case "champion":
        return "bg-red-500";
      case "titan":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelProgress = (xp: number) => {
    const levelThresholds = [0, 200, 400, 600, 800, 1000];
    const currentLevel = levelThresholds.findIndex((threshold) => xp < threshold) - 1;
    const nextLevelXP = levelThresholds[currentLevel + 1];
    const currentLevelXP = levelThresholds[currentLevel];
    return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  const formatLastActive = (date: Date) => {
      const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{leaderboard.title}</span>
            <Badge variant="outline" className="text-sm">
              {timeLeft} left
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Your Rank</h3>
              <p className="text-2xl font-bold">{currentUser.rank}</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Your Level</h3>
              <p className="text-2xl font-bold">{currentUser.level}</p>
              <Progress value={getLevelProgress(currentUser.xp)} className="mt-2" />
            </div>
            <div className="bg-background p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">XP</h3>
              <p className="text-2xl font-bold">{currentUser.xp}</p>
                  </div>
            <div className="bg-background p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Streak</h3>
              <p className="text-2xl font-bold">{currentUser.streak} days</p>
            </div>
                            </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-7 mb-4">
          <TabsTrigger value="all" onClick={() => setSelectedRank("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="pro" onClick={() => setSelectedRank("pro")}>
            Pro
          </TabsTrigger>
          <TabsTrigger value="ace" onClick={() => setSelectedRank("ace")}>
            Ace
          </TabsTrigger>
          <TabsTrigger value="star" onClick={() => setSelectedRank("star")}>
            Star
          </TabsTrigger>
          <TabsTrigger value="elite" onClick={() => setSelectedRank("elite")}>
            Elite
          </TabsTrigger>
          <TabsTrigger value="unstoppable" onClick={() => setSelectedRank("unstoppable")}>
            Unstoppable
          </TabsTrigger>
          <TabsTrigger value="champion" onClick={() => setSelectedRank("champion")}>
            Champion
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedRank}>
          <div className="space-y-4">
            {filteredEntries.map((entry, index) => (
              <Card key={entry.userId} className={entry.userId === currentUser.userId ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold w-8">{index + 1}</span>
                      <Avatar>
                        <AvatarImage src={entry.profileImage} alt={entry.username} />
                        <AvatarFallback>{entry.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{entry.username}</p>
                        <p className="text-sm text-muted-foreground">
                          Level {entry.level} • {entry.completedCourses} courses completed
                            </p>
                          </div>
                        </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold">{entry.score} XP</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.quizAccuracy}% quiz accuracy
                        </p>
                      </div>
                      <Badge className={getRankColor(entry.rank)}>{entry.rank}</Badge>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={getLevelProgress(entry.xp)} className="h-2" />
            </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last active: {formatLastActive(entry.lastActive)}
                  </p>
        </CardContent>
      </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderBoard;
