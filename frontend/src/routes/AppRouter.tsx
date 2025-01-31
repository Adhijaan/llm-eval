import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Navbar from "../pages/Layout";
import Run from "../pages/Run";
import Build from "../pages/Build";
import Log from "../pages/Log";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<Run />} />
        <Route path="Run" element={<Run />} />
        <Route path="Build" element={<Build />} />
        <Route path="Log" element={<Log />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
