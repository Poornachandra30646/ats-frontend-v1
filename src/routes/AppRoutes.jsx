import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import UploadResume from "../pages/UploadResume";
import ResumeHistory from "../pages/ResumeHistory";
import AnalyzeResume from "../pages/AnalyzeResume";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import ReportDetails from "../pages/ReportDetails";
import ResetPassword from "../pages/ResetPassword";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-history"
        element={
          <ProtectedRoute>
            <ResumeHistory />
          </ProtectedRoute>
        }
      />


      <Route
        path="/analyze/:resumeId"
        element={
          <ProtectedRoute>
            <AnalyzeResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report/:id"
        element={
          <ProtectedRoute>
            <ReportDetails />
          </ProtectedRoute>
        }
      />

      <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

    </Routes>

  );

}

export default AppRoutes;