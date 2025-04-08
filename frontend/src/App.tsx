import { ThemeProvider } from "@/app/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import TopCourses from "./layouts/courses/TopCourses";
import RecentCourses from "./layouts/courses/RecentCourses";
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
import Cart from "./pages/account/Cart";
import LeaderBoard from "./pages/account/LeaderBoard";
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
import InstructorDashboard from "./pages/instructor_dashboard/Dashboard";
import InstructorDashboardOutletLayout from "./layouts/InstructorDashboardOutletLayout";
import MyEarnings from "./pages/instructor_dashboard/MyEarnings";
import Students from "./pages/instructor_dashboard/Students";
import CertifiedStudents from "./pages/instructor_dashboard/CertifiedStudents";
import Followers from "./pages/instructor_dashboard/Followers";
import DashboardCourses from "./pages/instructor_dashboard/Courses";
import CreateCourse from "./pages/instructor_dashboard/CreateCourse";
import ResetScroll from "./components/ResetScroll";
import RequireAuth from "./components/RequireAuth";
import AppLoading from "./components/AppLoading";
import { PageProgressStart } from "./layouts/RouterProgress";
import LayoutWithProgress from "./layouts/LayoutWithProgress";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <ResetScroll />
        <AppLoading />
        <PageProgressStart />
        <Routes>
          <Route element={<LayoutWithProgress />}>
            {/* AUTH ROUTES */}
            <Route path="/auth" element={<AuthOutletLayout />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="otp-verification" element={<OTPVerification />} />

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

              {/* !!! PRICING ROUTE HAS BEEN SUSPENDED !!! */}
              {/* <Route path="pricing" element={<h1>Pricing</h1>} /> */}

              {/* !!! BLOG ROUTE HAS BEEN SUSPENDED !!! */}
              {/* <Route path="blogs" element={<Blogs />}>
                <Route
                  path="featured"
                  element={<FeaturedBlogs page="self" />}
                />
                <Route path="popular" element={<PopularBlogs page="self" />} />
                <Route path="recent" element={<RecentBlogs page="self" />} />
                <Route path="blog/:id" element={<Blog />} />
              </Route> */}

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

              <Route path="/help" element={<Help />} />
              <Route path="/t&c" element={<TestPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="about" element={<About />} />

              <Route path="/leader-board" element={<LeaderBoard />} />
              {/* Protected Routes */}
              <Route element={<RequireAuth />}>
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/settings" element={<Settings />} />
                <Route path="/account/cart" element={<Cart />} />
                <Route path="/account/leader-board" element={<LeaderBoard />} />
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
              </Route>

              {/* 404 page ROUTES */}
              <Route path="*" element={<NotFound />} />
              <Route path="404" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;
