import AnalyticsCard from "@/components/instructor_dashboard/AnalyticsCard";
import {
  Book,
  CoinsIcon,
  UsersRoundIcon,
  Calendar,
  MessageSquare,
  BarChart2,
  Award,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
} from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { useApp } from "@/app/app-provider";
import { format, subDays } from "date-fns";
import { tempCourses as recentPublish } from "@/constants/temp";
import CourseCard from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getInstructorStats } from "@/api/hooks/instructor/useInstructorStats";

const Dashboard = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, MMMM d, yyyy");

  // Fetch real instructor stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["instructorStats"],
    queryFn: getInstructorStats,
  });

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature} is coming soon!`, {
      description: "We're working hard to bring you this feature.",
      icon: <AlertCircle className="text-blue-500" />,
    });
  };

  const cardInformation = [
    {
      icon: CoinsIcon,
      label: "Earnings",
      total: stats?.earnings || 0,
      link: "/dashboard/analytics",
      description: "Total revenue from courses",
      trend: stats?.earningsTrend || "+0% this month",
      isImplemented: true,
    },
    {
      icon: Book,
      label: "Courses",
      total: stats?.totalCourses || 0,
      link: "/dashboard/courses",
      description: "Published courses",
      trend: stats?.coursesTrend || "+0 new courses",
      isImplemented: true,
    },
    {
      icon: UsersRoundIcon,
      label: "Students",
      total: stats?.totalStudents || 0,
      link: "/dashboard/students",
      description: "Active learners",
      trend: stats?.studentsTrend || "+0 new students",
      isImplemented: true,
    },
    {
      icon: UsersRoundIcon,
      label: "Followers",
      total: stats?.totalFollowers || 0,
      link: "/dashboard/followers",
      description: "Social following",
      trend: stats?.followersTrend || "+0 new followers",
      isImplemented: true,
    },
    {
      icon: MessageSquare,
      label: "Reviews",
      total: stats?.totalReviews || 0,
      link: "/dashboard/reviews",
      description: "Course feedback",
      trend: stats?.averageRating
        ? `${stats.averageRating.toFixed(1)} average rating`
        : "No ratings yet",
      isImplemented: false,
    },
    {
      icon: Calendar,
      label: "Schedule",
      total: stats?.upcomingSessions || 0,
      link: "/dashboard/schedule",
      description: "Upcoming sessions",
      trend: stats?.sessionsToday
        ? `${stats.sessionsToday} sessions today`
        : "No sessions today",
      isImplemented: false,
    },
    {
      icon: BarChart2,
      label: "Performance",
      total: stats?.performanceScore || 0,
      link: "/dashboard/performance",
      description: "Overall rating",
      trend: stats?.performanceRank
        ? `Top ${stats.performanceRank}% instructor`
        : "No rank yet",
      isImplemented: false,
    },
    {
      icon: Award,
      label: "Certifications",
      total: stats?.certifications || 0,
      link: "/dashboard/certifications",
      description: "Achievements",
      trend: stats?.newBadges
        ? `${stats.newBadges} new badges`
        : "No new badges",
      isImplemented: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-base sm:text-xl lg:text-2xl font-bold">
          Welcome back, {user.firstName}!
        </h1>
        <p className="opacity-70">{formattedDate}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardInformation.map((card) => (
          <AnalyticsCard
            key={card.label}
            count={card.total}
            label={card.label}
            icon={<card.icon />}
            link={card.isImplemented ? card.link : "#"}
            isMoney={card.label === "Earnings"}
            description={card.description}
            trend={card.trend}
            onClick={
              !card.isImplemented
                ? () => handleComingSoon(card.label)
                : undefined
            }
          />
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-sidebar p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" />
            <h3 className="text-lg lg:text-xl font-semibold">
              Completion Rate
            </h3>
          </div>
          <p className="text-base lg:text-lg font-bold mt-2">
            {stats?.completionRate || 0}%
          </p>
          <p className="text-sm opacity-70">
            of students complete your courses
          </p>
        </div>
        <div className="bg-sidebar p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            <h3 className="text-lg lg:text-xl font-semibold">
              Student Satisfaction
            </h3>
          </div>
          <p className="text-base lg:text-lg font-bold mt-2">
            {stats?.studentSatisfaction?.toFixed(1) || 0}/5
          </p>
          <p className="text-sm opacity-70">average rating from students</p>
        </div>
        <div className="bg-sidebar p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" />
            <h3 className="text-base lg:text-lg font-semibold">
              Engagement Rate
            </h3>
          </div>
          <p className="text-base sm:text-xl lg:text-2xl font-bold mt-2">
            {stats?.engagementRate || 0}%
          </p>
          <p className="text-sm opacity-70">active participation in courses</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            asChild
            className="h-24 flex flex-col gap-2"
            onClick={() => navigate("/dashboard/courses/create")}
          >
            <div>
              <Book className="size-6" />
              <span>Create New Course</span>
            </div>
          </Button>
          <Button
            className="h-24 flex flex-col gap-2"
            onClick={() => handleComingSoon("Live Sessions")}
          >
            <Calendar className="size-6" />
            <span>Schedule Live Session</span>
          </Button>
          <Button
            asChild
            className="h-24 flex flex-col gap-2"
            onClick={() => navigate("/dashboard/analytics")}
          >
            <div>
              <BarChart2 className="size-6" />
              <span>View Analytics</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Recently Published Courses */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recently Published Courses</h2>
          <Button variant="outline" asChild>
            <Link to="/dashboard/courses">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats?.recentCourses?.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              page="dashboard"
              id={course.id}
              type={course.type}
              price={course.price}
              subject={course.category}
              thumbnail={course.thumbnail}
              title={course.title}
              videoURL={course.videoURL}
              instructorName={course.instructorName}
              instructorProfileImage={course.instructorProfileImage}
              instructorProfileURL={course.instructorProfileURL}
              rating={course.rating}
              reviews={course.reviews}
              isVerified={course.isVerified}
              isFollowing={course.isFollowing}
              date={course.date}
              viewMode="grid"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
