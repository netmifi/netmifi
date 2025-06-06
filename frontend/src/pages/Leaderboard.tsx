import { useApp } from "@/app/app-provider";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { LoadingFallback, ErrorFallback } from "@/components/Fallback";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardEntry } from "@/types/leaderboard";

const Leaderboard = () => {
  const { user } = useApp();
  const {
    globalLeaderboard,
    courseLeaderboard,
    userPosition,
    loading,
    error,
    fetchGlobalLeaderboard,
    fetchCourseLeaderboard,
    fetchUserPosition
  } = useLeaderboard(user?._id);

  useEffect(() => {
    fetchGlobalLeaderboard();
    fetchUserPosition();
  }, []);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={fetchGlobalLeaderboard} />;
  }

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => (
    <div
      key={entry._id}
      className="flex items-center justify-between p-4 border-b"
    >
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">{index + 1}</span>
        <div className="flex items-center gap-2">
          {entry.user.avatar && (
            <img
              src={entry.user.avatar}
              alt={entry.user.name}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="font-medium">{entry.user.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">{entry.xp} XP</span>
        <div className="text-sm text-gray-500">
          {entry.progress.completedCourses}/{entry.progress.totalCourses} courses
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      
      {userPosition && (
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Position</h2>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">{userPosition.rank}</span>
              <span className="text-gray-500">/{userPosition.totalUsers}</span>
            </div>
            <div className="text-lg">
              <span className="font-bold">{userPosition.xp}</span> XP
            </div>
            <div className="text-gray-500">
              Top {userPosition.percentile}%
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
          <TabsTrigger value="course">Course Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="global">
          <div className="bg-white rounded-lg shadow">
            {globalLeaderboard.map((entry, index) => renderLeaderboardEntry(entry, index))}
          </div>
        </TabsContent>
        
        <TabsContent value="course">
          <div className="bg-white rounded-lg shadow">
            {courseLeaderboard.map((entry, index) => renderLeaderboardEntry(entry, index))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard; 