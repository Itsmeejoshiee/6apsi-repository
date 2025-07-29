import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReportPage from "./pages/ReportPage";
import AddTaskPage from "./pages/AddTaskPage";
import RegisterPage from "./pages/RegisterPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/add" element={<AddTaskPage />} />
        <Route path="/edit/:taskId" element={<EditTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;