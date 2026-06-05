// ResumeHistory.jsx

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaFilePdf,
  FaTrash,
  FaChartLine,
  FaSearch,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function ResumeHistory() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(response.data.resumes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this resume?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchResumes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.originalFileName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] text-xl font-semibold">
          Loading Resumes...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-black">Resume History</h1>
            <p className="text-gray-600 mt-2">
              Manage and track all of your uploaded resumes
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center bg-white px-4 rounded-xl shadow-md">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search and Filter"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 outline-none bg-transparent"
              />
            </div>

            <Link
              to="/upload-resume"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-blue-700"
            >
              <FaPlus />
              Upload New Resume
            </Link>
          </div>
        </div>

        {filteredResumes.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">No Resumes Found</h2>
            <p className="mt-3 text-gray-500">Upload your first resume</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <FaFilePdf className="text-red-500 text-4xl" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="font-bold text-xl break-words">
                        {resume.originalFileName}
                      </h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        V{resume.version}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-2">
                      Uploaded:{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 flex-wrap">
                  <button
                    onClick={() => navigate(`/analyze/${resume._id}`)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <FaChartLine />
                    Analyze
                  </button>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">Activity Log</h2>
          <div className="space-y-3">
            {resumes.slice(0, 5).map((resume) => (
              <div
                key={resume._id}
                className="flex justify-between border-b pb-2"
              >
                <span>Upload Resume</span>
                <span className="text-gray-500">V{resume.version}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResumeHistory;