import { ThemeProvider } from "@/app/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import { Toaster } from "@/components/ui/sonner";

import { AppProvider } from "./app/app-provider";

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
              <Route path="index" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
              <Route path="404" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
