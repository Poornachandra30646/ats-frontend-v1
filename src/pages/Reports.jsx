import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Reports() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const averageScore = reports.length
    ? Math.round(
        reports.reduce((sum, report) => sum + report.score, 0) / reports.length
      )
    : 0;

  const highestScore = reports.length
    ? Math.max(...reports.map((r) => r.score))
    : 0;

  const latestReport = reports.length
    ? reports.reduce((latest, r) =>
        new Date(r.createdAt) > new Date(latest.createdAt) ? r : latest
      )
    : null;
  const latestScore = latestReport ? latestReport.score : 0;

  // Prepare trend data for chart (last 7 reports, sorted by date)
  const trendData = [...reports]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-7)
    .map((r) => ({
      date: new Date(r.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      score: r.score,
    }));

  const filteredReports = reports.filter((report) => {
    const term = search.toLowerCase();
    const resumeName = report.resumeName || report.fileName || "";
    const jobTitle = report.jobTitle || report.jobDescription || "";
    return (
      resumeName.toLowerCase().includes(term) ||
      jobTitle.toLowerCase().includes(term) ||
      report.score.toString().includes(term) ||
      (report.atsGrade && report.atsGrade.toLowerCase().includes(term))
    );
  });

 useEffect(() => {
  fetchReports();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const fetchReports = async () => {
    try {
      const response = await api.get("/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data.reports);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReports();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const getStatusBadge = (score) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-700" };
    if (score >= 60) return { label: "Good", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-700" };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">ATS Reports</h1>
          <p className="text-gray-500 mt-1">
            Track and compare all your ATS resume analyses.
          </p>
        </div>

        {/* Summary Insights Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Overall Analytics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Overall Analytics
              </h2>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Reports</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {reports.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {averageScore}%
                  </p>
                </div>
              </div>
              {/* Tiny Trend Chart */}
              {trendData.length > 1 && (
                <div className="mt-4 h-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="url(#colorScore)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Right: Best Performance */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Best Performance
              </h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Highest Score</p>
                  <p className="text-4xl font-bold text-green-600">
                    {highestScore}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Latest Score</p>
                  <p className="text-4xl font-bold text-purple-600">
                    {latestScore}%
                  </p>
                </div>
              </div>
              {latestReport && (
                <p className="text-xs text-gray-400 mt-2">
                  Latest analysis:{" "}
                  {new Date(latestReport.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar & New Analysis Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by resume name or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg"
          >
            + New Analysis
          </button>
        </div>

        {/* Reports Table */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-500">
            No reports found.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-4">Resume Name</th>
                    <th className="px-6 py-4">Target Job</th>
                    <th className="px-6 py-4">Date Scanned</th>
                    <th className="px-6 py-4">ATS Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredReports.map((report) => {
                    const status = getStatusBadge(report.score);
                    return (
                      <tr
                        key={report._id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {report.resumeName || report.fileName || "Resume"}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {report.jobTitle
                            ? report.jobTitle
                            : report.jobDescription
                            ? report.jobDescription.length > 50
                              ? report.jobDescription.substring(0, 50) + "..."
                              : report.jobDescription
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-lg">
                            {report.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/report/${report._id}`)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(report._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* New Analysis button again at bottom if needed, but we already have one at top */}
      </div>
    </Layout>
  );
}

export default Reports;