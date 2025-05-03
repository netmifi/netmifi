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
import InstructorDashboard from "./pages/dashboard/Dashboard";
import InstructorDashboardOutletLayout from "./layouts/InstructorDashboardOutletLayout";
import Analytics from "./pages/dashboard/Analytics";
import Students from "./pages/dashboard/Students";
import CertifiedStudents from "./pages/dashboard/CertifiedStudents";
import Followers from "./pages/dashboard/Followers";
import DashboardCourses from "./pages/dashboard/Courses";
import CreateCourse from "./pages/dashboard/CreateCourse";
import ResetScroll from "./components/ResetScroll";
import RequireAuth from "./components/RequireAuth";
import AppLoading from "./components/AppLoading";
import { PageProgressStart } from "./layouts/RouterProgress";
import LayoutWithProgress from "./layouts/LayoutWithProgress";
import SearchResults from "./pages/SearchResults";
import ClipPlayer from "./components/courses/ClipsPlayer";
import { CourseProcessor } from "./services/courseProcessor";

const App = () => {
  //   const location = useLocation();

  //   useLayoutEffect(() => {
  //     // Scroll to the top of the page when the route changes
  //     window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  //   }, [location.pathname]);
  // };
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AppLoading />
        <PageProgressStart />
        <ResetScroll>
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
                  <Route path="course/:slug" element={<CoursePreview />} />
                  <Route path="my-courses" element={<MyCourses />} />
                  <Route path="my-courses/:slug" element={<LearnPlay />} />
                  <Route path="learn/:slug" element={<LearnPlay />} />
                  <Route path="process/:slug" element={<CourseProcessor />} />
                  {/* You can keep course clips separate */}
                  <Route path="clips/:slug" element={<ClipPlayer />} />
                </Route>
                <Route path="clips" element={<ClipPlayer />} />
                <Route path="clips/:slug" element={<ClipPlayer />} />

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
                <Route path="blog/:slug" element={<Blog />} />
              </Route> */}

                {/* INSTRUCTORS ROUTE */}
                <Route path="instructors" element={<Instructors />}>
                  <Route path="instructor/:slug" element={<Instructor />} />
                </Route>

                {/* USER ROUTES */}
                <Route path="/user/:slug" element={<h1>User</h1>} />
                <Route
                  path="/user/:slug/courses"
                  element={<h1>Recent Courses</h1>}
                />

                <Route path="/help" element={<Help />} />
                <Route path="/t&c" element={<TestPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="about" element={<About />} />
                <Route path="search" element={<SearchResults />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                  <Route path="/account/profile" element={<Profile />} />
                  <Route path="/account/settings" element={<Settings />} />
                  <Route path="/account/cart" element={<Cart />} />
                  <Route
                    path="/account/leader-board"
                    element={<LeaderBoard />}
                  />
                  {/* INSTRUCTOR DASHBOARD ROUTES */}
                  <Route
                    path="dashboard"
                    element={<InstructorDashboardOutletLayout />}
                  >
                    <Route path="home" element={<InstructorDashboard />} />
                    <Route path="students" element={<Students />} >
                    <Route
                      path="certified-students"
                      element={<CertifiedStudents />}
                    />
                    <Route path="home/followers" element={<Followers />} />
                    <Route path="my-courses" element={<DashboardCourses />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="create" element={<CreateCourse />} />
                  </Route>
                </Route>

                {/* 404 page ROUTES */}
                <Route path="*" element={<NotFound />} />
                <Route path="404" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
          </ResetScroll>
          <Toaster richColors duration={1500} closeButton={true} expand />
      </Router>
    </ThemeProvider>
  );
};

export default App;
