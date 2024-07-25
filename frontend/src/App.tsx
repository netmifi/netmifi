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

const App = () => {

  return (
    <Router>
      <Routes>
        {/* ROOT ROUTES */}
        <Route path="/" element={<AppOutletLayout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<h1>About us</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} />

          {/* COURSES ROUTE */}
          <Route path="courses" element={<Courses />}>
            <Route path="courses/top" element={<TopCourses page="self" />} />
            <Route
              path="courses/recent"
              element={<RecentCourses page="self" />}
            />
            <Route path="course/:id" element={<CoursePreview />} />
            <Route path="my-courses/:id" element={<LearnPlay />} />
          </Route>

          {/* COURSES ROUTE */}

          <Route path="pricing" element={<h1>Pricing</h1>} />

          {/* BLOGS ROUTE */}
          <Route path="blogs" element={<Blogs />}>
            <Route path="featured" element={<FeaturedBlogs page="self" />} />
            <Route path="popular" element={<PopularBlogs page="self" />} />
            <Route path="recent" element={<RecentBlogs page="self" />} />
            <Route path="blog/:id" element={<Blog />} />
          </Route>

          {/* INSTRUCTORS ROUTE */}
          <Route path="instructors" element={<Instructors />} />

          {/* USER ROUTES */}
          <Route path="/user/:id" element={<h1>User</h1>} />
          <Route path="/user/:id/courses" element={<h1>Recent Courses</h1>} />

          {/* AUTH ROUTES */}

          {/* 404 page ROUTES */}
          <Route path="*" element={<NotFound />} />
          <Route path="404" element={<NotFound />} />
        </Route>

        <Route path="/auth" element={<AuthOutletLayout />}>
          <Route path="signin" element={<h1>Auth signin</h1>} />
          <Route path="signup" element={<h1>Auth signup</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
