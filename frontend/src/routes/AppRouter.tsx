import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Test from "../pages/Test";
import Experiments from "../pages/Experiments";
import History from "../pages/History";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Test />} />
        <Route path="Test" element={<Test />} />
        <Route path="Experiments" element={<Experiments />} />
        <Route path="History" element={<History />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
