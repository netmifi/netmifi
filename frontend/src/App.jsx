import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => (
  <div className="App">
    <Routes>
      <Route  path="/" element={<Home/>}/>
    </Routes>
  </div>
);

export default App;
