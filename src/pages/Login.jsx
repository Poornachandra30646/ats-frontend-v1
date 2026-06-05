import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { pendingResume, setPendingResume } = useResume();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const pendingResumeName = sessionStorage.getItem("pendingResumeName");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadPendingResume = async (token) => {
    if (!pendingResume) return;
    try {
      const formData = new FormData();
      formData.append("resume", pendingResume);
      await api.post("/resume/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingResume(null);
      sessionStorage.removeItem("pendingResumeName");
    } catch (error) {
      console.error("Auto Upload Failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      login(response.data.user, response.data.token);
      await uploadPendingResume(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });
      login(response.data.user, response.data.token);
      await uploadPendingResume(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">
            Please login to access your resume analysis reports
          </p>
        </div>

        {pendingResumeName && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-5 text-sm">
            📄 Resume Ready: <br />
            {pendingResumeName}
            <br />
            <span className="text-xs">
              Will upload automatically after login
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-semibold block mb-2">Email</label>
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <label className="text-sm font-semibold block mb-2">Password</label>
          <div className="relative mb-2">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Login Failed")}
            theme="outline"
            shape="rectangular"
            size="large"
          />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;