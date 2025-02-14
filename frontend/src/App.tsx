import { ThemeProvider } from "@/app/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Blogs from "./pages/Blogs";
import Blog from "./layouts/blogs/Blog";
import TopCourses from "./layouts/courses/TopCourses";
import RecentCourses from "./layouts/courses/RecentCourses";
import FeaturedBlogs from "./layouts/blogs/FeaturedBlogs";
import PopularBlogs from "./layouts/blogs/PopularBlogs";
import RecentBlogs from "./layouts/blogs/RecentBlogs";
import Instructors from "./pages/Instructors";
import CoursePreview from "./layouts/courses/CoursePreview";
import AppOutletLayout from "./layouts/AppOutletLayout";
import AuthOutletLayout from "./layouts/AuthOutletLayout";
import LearnPlay from "./layouts/courses/LearnPlay";
import About from "./pages/About";
import MyCourses from "./layouts/courses/MyCourses";
import { Toaster } from "@/components/ui/sonner";
import Instructor from "./layouts/instructors/Instructor";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import OTPVerification from "./pages/auth/OTPVerification";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ViaEmail from "./pages/auth/forgot-password/ViaEmail";
import NewPassword from "./pages/auth/forgot-password/NewPassword";
import Welcome from "./pages/auth/welcome/Welcome";
import Interest from "./pages/auth/welcome/Interest";
import Profile from "./pages/account/Profile";
import Settings from "./pages/account/Settings";
import SignInstructor from "./pages/auth/welcome/SignInstructor";
import TestPage from "./pages/TestPage";
// import InstructorDashboardOutletLayout from "./layouts/InstructorDashboardOutletLayout";

import InstructorDashboard from "./pages/instructor_dashboard/Dashboard";
import { AppProvider } from "./app/app-provider";
import InstructorDashboardOutletLayout from "./layouts/InstructorDashboardOutletLayout";
import MyEarnings from "./pages/instructor_dashboard/MyEarnings";
import Students from "./pages/instructor_dashboard/Students";
import CertifiedStudents from "./pages/instructor_dashboard/CertifiedStudents";
import Followers from "./pages/instructor_dashboard/Followers";
import DashboardCourses from "./pages/instructor_dashboard/Courses";
import CreateCourse from "./pages/instructor_dashboard/CreateCourse";
import ResetScroll from "./components/ResetScroll";

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
      <ResetScroll />
          <Routes>
            {/* AUTH ROUTES */}
            <Route path="/auth" element={<AuthOutletLayout />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="otp-verification" element={<OTPVerification />} />
              {/* <Route path="verification-type" element={<OTPVerification />} /> */}
              <Route path="forgot-password" element={<ForgotPassword />}>
                <Route path="via-email" element={<ViaEmail />} />
                <Route path="new-password" element={<NewPassword />} />
              </Route>

              <Route path={"welcome"} element={<Welcome />}>
                <Route
                  path="instructor-application"
                  element={<SignInstructor />}
                />
                <Route path={"interest"} element={<Interest />} />
              </Route>
            </Route>

            {/* ROOT ROUTES */}

            <Route path="/" element={<AppOutletLayout />}>
              <Route path="home" element={<Home />} />

              <Route path="contact" element={<Contact />} />

              {/* COURSES ROUTE */}
              <Route path="courses" element={<Courses />}>
                <Route path="top" element={<TopCourses page="self" />} />
                <Route path="recent" element={<RecentCourses page="self" />} />
                <Route path="course/:id" element={<CoursePreview />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="my-courses/:id" element={<LearnPlay />} />
              </Route>

              {/* COURSES ROUTE */}

              <Route path="pricing" element={<h1>Pricing</h1>} />

              {/* BLOGS ROUTE */}
              <Route path="blogs" element={<Blogs />}>
                <Route
                  path="featured"
                  element={<FeaturedBlogs page="self" />}
                />
                <Route path="popular" element={<PopularBlogs page="self" />} />
                <Route path="recent" element={<RecentBlogs page="self" />} />
                <Route path="blog/:id" element={<Blog />} />
              </Route>

              {/* INSTRUCTORS ROUTE */}
              <Route path="instructors" element={<Instructors />}>
                <Route path="instructor/:id" element={<Instructor />} />
              </Route>

              {/* USER ROUTES */}
              <Route path="/user/:id" element={<h1>User</h1>} />
              <Route
                path="/user/:id/courses"
                element={<h1>Recent Courses</h1>}
              />

              {/* HELP ROUTE */}
              <Route path="/help" element={<Help />} />
              <Route path="/t&c" element={<TestPage />} />
              <Route path="/test" element={<TestPage />} />

              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/settings" element={<Settings />} />

              {/* FEEDBACK ROUTE */}
              <Route path="/feedback" element={<Feedback />} />
              {/* INSTRUCTOR DASHBOARD ROUTES */}
              <Route
                path="dashboard"
                element={<InstructorDashboardOutletLayout />}
              >
                <Route path="home" element={<InstructorDashboard />} />
                <Route path="home/students" element={<Students />} />
                <Route
                  path="home/certified-students"
                  element={<CertifiedStudents />}
                />
                <Route path="home/followers" element={<Followers />} />
                <Route path="home/courses" element={<DashboardCourses />} />
                <Route path="my-earnings" element={<MyEarnings />} />
                <Route path="create" element={<CreateCourse />} />
              </Route>

              {/* ABOUT ROUTE */}
              <Route path="about" element={<About />} />

              {/* 404 page ROUTES */}
              <Route path="*" element={<NotFound />} />
              <Route path="404" element={<NotFound />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
