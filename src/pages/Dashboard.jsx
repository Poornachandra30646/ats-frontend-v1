import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaChartBar,
  FaStar,
  FaUpload,
  FaHistory,
  FaClipboardList,
  FaUser,
  FaCloudUploadAlt,
  FaFilePdf,
  FaSpinner,
} from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [stats, setStats] = useState({
    totalResumes: 0,
    totalReports: 0,
    averageScore: 0,
    recentReports: [],
  });

  // Upload & Analyze states
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const highestScore =
    stats.recentReports?.length > 0
      ? Math.max(...stats.recentReports.map((r) => r.score))
      : 0;

  // File selection handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setFileName(file.name);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    setFileSize(`${sizeMB} MB`);
    setUploadError("");
  };

  // Upload resume to server
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      const response = await api.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const id = response.data?.resume?._id || response.data?.resumeId || response.data?._id;
      if (id) {
        setResumeId(id);
        setUploadError("");
      } else {
        setUploadError("Upload succeeded but no resume ID returned.");
      }
    } catch (error) {
      console.error(error);
      setUploadError(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Analyze resume against job description
  const handleAnalyze = async () => {
    if (!resumeId) {
      alert("Please upload a resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }
    setAnalyzing(true);
    try {
      const response = await api.post(
        "/ats/analyze",
        { resumeId, jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const reportId = response.data?.report?._id || response.data?._id;
      if (reportId) {
        navigate(`/report/${reportId}`);
      } else {
        alert("Analysis completed but report ID not found.");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Reset upload
  const handleClearFile = () => {
    setSelectedFile(null);
    setFileName("");
    setFileSize("");
    setResumeId(null);
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Layout>
      {/* Top Header */}
      <header className="bg-white shadow-sm p-4 md:p-6 flex items-center justify-between rounded-2xl mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome Back, {user?.name} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {user?.bio || "Complete your profile"}
          </p>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition-colors"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <span className="hidden sm:inline">Profile</span>
        </Link>
      </header>

      {/* Dashboard Content */}
      <div className="space-y-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaFileAlt className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Resumes</p>
                <p className="text-2xl font-bold">{stats.totalResumes}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <FaChartBar className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ATS Reports</p>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <FaStar className="text-2xl text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <FaStar className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Highest Score</p>
                <p className="text-2xl font-bold">{highestScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analyze Your Resume Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Analyze Your Resume</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Resume Upload */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Upload Resume</h3>
                <div
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    resumeId
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onClick={() => !resumeId && fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                  />
                  {!selectedFile ? (
                    <>
                      <FaCloudUploadAlt className="text-5xl text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium">
                        Drag & Drop Resume
                      </p>
                      <p className="text-gray-400 text-sm">PDF, DOCX supported</p>
                      <button
                        type="button"
                        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Browse Files
                      </button>
                    </>
                  ) : (
                    <>
                      <FaFilePdf className="text-5xl text-blue-600 mb-3" />
                      <p className="font-medium text-gray-800">{fileName}</p>
                      <p className="text-sm text-gray-500">{fileSize}</p>
                      {!resumeId && (
                        <button
                          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpload();
                          }}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <span className="flex items-center gap-2">
                              <FaSpinner className="animate-spin" /> Uploading...
                            </span>
                          ) : (
                            "Upload Resume"
                          )}
                        </button>
                      )}
                      {resumeId && (
                        <p className="mt-3 text-green-600 flex items-center gap-1">
                          ✅ Resume uploaded successfully
                        </p>
                      )}
                      {!resumeId && (
                        <button
                          className="mt-2 text-red-500 text-sm hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearFile();
                          }}
                        >
                          Remove
                        </button>
                      )}
                      {uploadError && (
                        <p className="mt-2 text-red-500 text-sm">{uploadError}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Right: Job Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste Job Description Here..."
                  className="w-full h-48 border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Paste the full job description for accurate analysis.
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !resumeId || !jobDescription.trim()}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {analyzing ? (
                  <>
                    <FaSpinner className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  "Analyze Compatibility"
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Recent Reports */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent ATS Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.recentReports?.length > 0 ? (
              stats.recentReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">ATS Score</p>
                      <p className="text-4xl font-bold text-blue-600">
                        {report.score}%
                      </p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <FaChartBar className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/report/${report._id}`}
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Report →
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No recent reports yet.
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/upload-resume"
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="bg-blue-100 p-4 rounded-full">
                <FaUpload className="text-2xl text-blue-600" />
              </div>
              <span className="font-medium">Upload Resume</span>
            </Link>
            <Link
              to="/resume-history"
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="bg-purple-100 p-4 rounded-full">
                <FaHistory className="text-2xl text-purple-600" />
              </div>
              <span className="font-medium">Resume History</span>
            </Link>
            <Link
              to="/reports"
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <FaClipboardList className="text-2xl text-green-600" />
              </div>
              <span className="font-medium">ATS Reports</span>
            </Link>
            <Link
              to="/profile"
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
            >
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaUser className="text-2xl text-yellow-600" />
              </div>
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </section>

        {/* Recent Activity (Timeline) */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow p-6">
            {stats.recentReports?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentReports.map((report) => (
                  <div
                    key={report._id}
                    className="flex items-center gap-4 py-3 border-b last:border-0"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaFileAlt className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Resume Analyzed</p>
                      <p className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      {report.score}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No recent activity.</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Dashboard;