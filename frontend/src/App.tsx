import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./layouts/Footer";
import NotFound from "./pages/NotFound";
import Navbar from "./layouts/navbar/Navbar";


const App = () => (
  <div className="app">
    <Router>
      <Navbar />
      <Routes>
        {/* ROOT ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<h1>About us</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="courses" element={<h1>Courses</h1>} />
        <Route path="pricing" element={<h1>Pricing</h1>} />
        <Route path="blog" element={<h1>Blog</h1>} />

        {/* USER ROUTES */}
        <Route path="/user/:id" element={<h1>User</h1>} />
        <Route path="/user/:id/courses" element={<h1>Recent Courses</h1>} />

        {/* AUTH ROUTES */}
        <Route path="/auth" element={<h1>Auth index</h1>} />
        <Route path="/auth/signin" element={<h1>Auth signin</h1>} />
        <Route path="/auth/signup" element={<h1>Auth signup</h1>} />

        {/* 404 page ROUTES */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App
