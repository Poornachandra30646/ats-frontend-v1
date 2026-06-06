import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ReportDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const fetchReport = async () => {
  try {
    const response = await api.get(`/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReport(response.data.report);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

  fetchReport();

}, []);

  const handleExportPdf = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/reports/export/${id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ATS_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to export report");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Loading your ATS report…</p>
        </div>
      </div>
    );
  }

  const pieData = [
    { name: "Matched", value: report?.matchedKeywords?.length ?? 0 },
    { name: "Missing", value: report?.missingKeywords?.length ?? 0 },
  ];
  const PIE_COLORS = ["#22c55e", "#ef4444"];

  const skillData = report?.skillAlignment?.length
    ? report.skillAlignment.map((s) => ({
        name: s.skill,
        percentage: s.percentage,
      }))
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">ATS Analysis Report</h1>
          <p className="text-gray-500 mt-1">
            Detailed ATS compatibility analysis and improvement recommendations.
          </p>
        </div>
        <button
          onClick={handleExportPdf}
          disabled={downloading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow ${
            downloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {downloading ? "⏳ Generating PDF..." : "📄 Export PDF"}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">ATS Score</h3>
          <p className="text-5xl font-bold text-blue-600 mt-3">
            {report?.score ?? 0}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">ATS Grade</h3>
          <p className="text-5xl font-bold text-green-600 mt-3">
            {report?.atsGrade || "N/A"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Matched Keywords</h3>
          <p className="text-5xl font-bold text-purple-600 mt-3">
            {report?.matchedKeywords?.length ?? 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Missing Keywords</h3>
          <p className="text-5xl font-bold text-red-600 mt-3">
            {report?.missingKeywords?.length ?? 0}
          </p>
        </div>
      </div>

      {/* Summary Score Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">Summary Score</h2>
            <p className="text-7xl font-extrabold text-blue-600 mt-4">
              {report?.score ?? 0}%
            </p>
            <p className="text-lg font-semibold text-gray-600 mt-2">
              Grade: <span className="text-green-600">{report?.atsGrade || "N/A"}</span>
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-700 leading-relaxed bg-blue-50 p-5 rounded-xl">
              {report?.summary || "No summary available."}
            </p>
          </div>
        </div>
      </div>

      {/* Target Job Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-3">Target Job Description</h2>
        {report?.jobDescription ? (
          <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
            {report.jobDescription.length > 300
              ? `${report.jobDescription.substring(0, 300)}...`
              : report.jobDescription}
          </p>
        ) : (
          <p className="text-gray-500">Job description not provided.</p>
        )}
      </div>

      {/* Charts: Two-Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Keyword Match Donut */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Keyword Match</h3>
          {pieData[0].value > 0 || pieData[1].value > 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                    ))}
                    <Label
                      value={`${report?.score ?? 0}%`}
                      position="center"
                      style={{ fontSize: "1.5rem", fontWeight: "bold", fill: "#3b82f6" }}
                    />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No keyword data available.</p>
          )}
        </div>

        {/* Skills Gap Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Skills Gap</h3>
          {skillData.length > 0 ? (
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={Math.max(220, skillData.length * 30)}>
                <BarChart
                  layout="vertical"
                  data={skillData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="percentage"
                    fill="#3b82f6"
                    barSize={14}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No skill data available.</p>
          )}
        </div>
      </div>

      {/* Detailed Keyword Match */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            Matched Keywords
          </h3>
          {report?.matchedKeywords?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {report.matchedKeywords.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No matched keywords.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Missing Keywords
          </h3>
          {report?.missingKeywords?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {report.missingKeywords.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No missing keywords.</p>
          )}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-green-600 mb-3">Strengths</h3>
          {report?.strengths?.length > 0 ? (
            <ul className="space-y-2">
              {report.strengths.map((item, idx) => (
                <li key={idx} className="bg-green-50 p-3 rounded-lg">
                  ✅ {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No strengths listed.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold text-red-600 mb-3">Weaknesses</h3>
          {report?.weaknesses?.length > 0 ? (
            <ul className="space-y-2">
              {report.weaknesses.map((item, idx) => (
                <li key={idx} className="bg-red-50 p-3 rounded-lg">
                  ❌ {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No weaknesses listed.</p>
          )}
        </div>
      </div>

      {/* Formatting Analysis */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Formatting Analysis</h2>
        {report?.formattingAnalysis ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Headers</p>
              <p className="text-xl font-bold mt-1">
                {report.formattingAnalysis.headings ? "✓" : "✗"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Contact Info</p>
              <p className="text-xl font-bold mt-1">
                {report.formattingAnalysis.contactInfo ? "✓" : "✗"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Dates</p>
              <p className="text-xl font-bold mt-1">
                {report.formattingAnalysis.dates ? "✓" : "✗"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">File Type</p>
              <p className="text-xl font-bold mt-1">
                {report.formattingAnalysis.fileType ? "✓" : "✗"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No formatting analysis available.</p>
        )}
      </div>

      {/* ATS Suggestions */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">ATS Suggestions</h2>
        {report?.suggestions?.length > 0 ? (
          <div className="space-y-3">
            {report.suggestions.map((item, idx) => (
              <div
                key={idx}
                className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3"
              >
                <span className="text-xl">💡</span>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </div>

      {/* Full Job Description */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Full Job Description</h2>
        {report?.jobDescription ? (
          <div className="p-4 bg-slate-100 rounded-xl whitespace-pre-wrap text-gray-700">
            {report.jobDescription}
          </div>
        ) : (
          <p className="text-gray-500">Job description not provided.</p>
        )}
      </div>
    </div>
  );
}

export default ReportDetails;