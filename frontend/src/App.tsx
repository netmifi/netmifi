import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./layouts/Footer";
import NotFound from "./pages/NotFound";
import Navbar from "./layouts/navbar/Navbar";
import { cn } from "./lib/utils";
import { useStoreState } from "./store/store";
import Courses from "./pages/Courses";
import Course from "./layouts/courses/Course";
import Blogs from "./pages/Blogs";
import Blog from "./layouts/blogs/Blog";
import TopCourses from "./layouts/courses/TopCourses";
import RecentCourses from "./layouts/courses/RecentCourses";
import FeaturedBlogs from "./layouts/blogs/FeaturedBlogs";
import PopularBlogs from "./layouts/blogs/PopularBlogs";
import RecentBlogs from "./layouts/blogs/RecentBlogs";


const App = () => {
  const isAuth = useStoreState((state) => state.auth.isAuth);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ROOT ROUTES */}
        <Route path="/" element={<Home className={cn("max-container", { "md:ml-20": isAuth })} />} />
        <Route path="about" element={<h1>About us</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />

        {/* COURSES ROUTE */}
        <Route path="courses" element={<Courses className={cn("max-container", { "md:ml-20": isAuth })} />} />
        <Route path="courses/top" element={<TopCourses className={cn("max-container", { "md:ml-20": isAuth })} page="self" />} />
        <Route path="courses/recent" element={<RecentCourses className={cn("max-container", { "md:ml-20": isAuth })} page="self" />} />
        <Route path="courses/:course" element={<Course className={cn("max-container", { "md:ml-20": isAuth })} />} />

        <Route path="pricing" element={<h1>Pricing</h1>} />

        {/* BLOGS ROUTE */}
        <Route path="blogs" element={<Blogs className={cn("max-container", { "md:ml-20": isAuth })} />} />
        <Route path="blogs/featured" element={<FeaturedBlogs className={cn("max-container", { "md:ml-20": isAuth })} page="self" />} />
        <Route path="blogs/popular" element={<PopularBlogs className={cn("max-container", { "md:ml-20": isAuth })} page="self" />} />
        <Route path="blogs/recent" element={<RecentBlogs className={cn("max-container", { "md:ml-20": isAuth })} page="self" />} />
        <Route path="blogs/:id" element={<Blog className={cn("max-container", { "md:ml-20": isAuth })} />} />

        {/* USER ROUTES */}
        <Route path="/user/:id" element={<h1>User</h1>} />
        <Route path="/user/:id/courses" element={<h1>Recent Courses</h1>} />

        {/* AUTH ROUTES */}
        <Route path="auth" element={<h1>Auth index</h1>}>
          <Route path="signin" element={<h1>Auth signin</h1>} />
          <Route path="signup" element={<h1>Auth signup</h1>} />
        </Route>

        {/* 404 page ROUTES */}
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
      <Footer className={cn({ "md:ml-20": isAuth })} />
    </Router>
  )
}

export default App
