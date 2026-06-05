import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function UploadResume() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resumeId, setResumeId] = useState("");

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select a resume");
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await api.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setResumeId(response.data.resumeId);
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-center mb-2">
            Upload Resume
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Upload your resume and get ATS insights instantly
          </p>

          <div className="border-2 border-dashed border-blue-300 rounded-3xl p-10 text-center bg-blue-50">
            <FaCloudUploadAlt className="text-6xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Drag & Drop Resume</h3>
            <p className="text-gray-500 mt-2 mb-6">PDF, DOC, DOCX</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto"
            />
          </div>

          {file && (
            <div className="mt-6 bg-slate-50 p-4 rounded-xl flex items-center gap-3">
              <FaFileAlt className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

          {message && (
            <div className="mt-6 bg-green-100 border border-green-200 p-5 rounded-2xl">
              <h3 className="text-green-700 font-bold text-lg">
                ✅ Upload Successful
              </h3>
              <p className="mt-2">{message}</p>
              {resumeId && (
                <p className="mt-2 text-sm break-all text-gray-600">
                  Resume ID: {resumeId}
                </p>
              )}
              <div className="flex gap-3 mt-5 flex-wrap">
                <Link
                  to="/resume-history"
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                >
                  View History
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UploadResume;