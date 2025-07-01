import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import TraineeDashboard from './pages/TraineeDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import ManageModules from './pages/ManageModules';
import AssignModules from './pages/AssignModules';

const App = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="pt-16">
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/trainee-dashboard" element={<TraineeDashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/manage-modules' element={<ManageModules/>} />
        <Route path='/assign-modules' element={<AssignModules/>} />

        <Route
          path="/dashboard"
          element={
            role === "trainee" ? (
              <Navigate to="/trainee-dashboard" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor-dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
