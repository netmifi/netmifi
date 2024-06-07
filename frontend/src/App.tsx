import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./layouts/Footer";


const App = () => (
  <div className="app">
    <Router>
      <Routes>
        {/* ROOT ROUTES */}
        <Route path="/" element={<Home />}>

        </Route>

      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App
