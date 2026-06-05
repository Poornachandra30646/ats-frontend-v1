import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(response.data.message);
      setSent(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {!sent ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaLock className="text-blue-600 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Forgot Password
              </h1>
              <p className="text-gray-500 mt-2">
                No worries! Enter your email and we'll send you a password reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label className="text-sm font-semibold block mb-2">Email</label>
              <div className="relative mb-6">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* Error message */}
            {message && (
              <div className="mt-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm">
                {message}
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline"
              >
                <FaArrowLeft className="text-xs" />
                Back To Login
              </Link>
            </div>
          </>
        ) : (
          /* Success State */
          <>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reset Link Sent
              </h1>
              <p className="text-gray-500 mt-3">
                We've sent a password reset link to:
              </p>
              <p className="text-gray-900 font-semibold mt-1">{email}</p>
              <p className="text-gray-500 text-sm mt-2">
                Please check your inbox and spam folder.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold inline-block transition-colors"
              >
                Back To Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;