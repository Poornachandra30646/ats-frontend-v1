import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Profile() {
  const { user, token, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalReports: 0,
    highestScore: 0,
    averageScore: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setStats({
        totalResumes: data.totalResumes || 0,
        totalReports: data.totalReports || 0,
        highestScore: data.recentReports?.length
          ? Math.max(...data.recentReports.map((r) => r.score))
          : 0,
        averageScore: data.averageScore || 0,
      });
    } catch (error) {
      console.error("Failed to fetch profile stats", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async () => {
    if (!image) {
      return alert("Select an image");
    }
    try {
      const imgFormData = new FormData();
      imgFormData.append("profileImage", image);
      const response = await api.post("/auth/profile-image", imgFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      alert("Profile picture updated");
      setImage(null);
    } catch (error) {
      alert("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(
        "/auth/profile",
        {
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
      alert("Profile Updated");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const profileCompletion = () => {
    const fields = [
      user?.name,
      user?.profileImage,
      user?.phone,
      user?.location,
      user?.bio,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const skills = user?.skills?.length
    ? user.skills
    : ["React", "Node.js", "MongoDB", "Express"];

  const skillPercentages = skills.map((skill, idx) => ({
    name: skill,
    percentage: Math.max(95 - idx * 10, 50),
  }));

  const completionChecklist = [
    {
      label: "Profile Photo",
      done: !!user?.profileImage,
    },
    {
      label: "Email Verified",
      done: !!user?.isVerified,
    },
    {
      label: "Resume Uploaded",
      done: stats.totalResumes > 0,
    },
  ];

  const tabs = [
    { key: "personal", label: "Personal Info" },
    { key: "resumes", label: "Resumes & Uploads" },
    { key: "activity", label: "Activity Log" },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 shrink-0">
            {user?.profileImage ? (
              <img
  src={
    user.profileImage ||
    "/default-avatar.png"
  }
  alt="Profile"
  className="w-full h-full rounded-full object-cover border-4 border-white/20 shadow"
/>
            ) : (
              <div className="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-blue-200 font-medium mt-1">{user?.role || "User"}</p>
            <p className="text-slate-400 text-sm mt-2">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Account Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Account Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Email:</span> {user?.email}
              </div>
              <div>
                <span className="text-gray-500">Role:</span> {user?.role || "User"}
              </div>
              <div>
                <span className="text-gray-500">Member Since:</span>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
              <div>
                <span className="text-gray-500">Verified:</span>{" "}
                {user?.isVerified ? "✓" : "✗"}
              </div>
            </div>
          </div>

          {/* Resume Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Resume Statistics</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Total Resumes:</span> {stats.totalResumes}
              </div>
              <div>
                <span className="text-gray-500">ATS Reports:</span> {stats.totalReports}
              </div>
              <div>
                <span className="text-gray-500">Highest Score:</span> {stats.highestScore}%
              </div>
              <div>
                <span className="text-gray-500">Average Score:</span> {stats.averageScore}%
              </div>
            </div>
          </div>

          {/* ATS Skill Profile with Progress Bars */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">ATS Skill Profile</h3>
            <div className="space-y-4">
              {skillPercentages.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-gray-500">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Completion with Semi-Circle Gauge and Checklist */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Profile Completion</h3>
            <div className="flex flex-col items-center">
              <div className="w-40 h-24 -mb-2">
                <CircularProgressbar
                  value={profileCompletion()}
                  text={`${profileCompletion()}%`}
                  circleRatio={0.5}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "round",
                    trailColor: "#e5e7eb",
                    pathColor: "#22c55e",
                    textSize: "22px",
                    textColor: "#1f2937",
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-600 -mt-1">Complete</p>
            </div>
            <div className="mt-4 space-y-2">
              {completionChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className={item.done ? "text-green-600" : "text-gray-400"}>
                    {item.done ? "✅" : "⬜"}
                  </span>
                  <span className="text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "personal" && (
              <div>
                {/* Profile Image Upload */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-3">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="mb-2"
                      />
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Upload Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personal Info Form */}
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full mt-1 border border-gray-300 rounded-xl p-3 bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full mt-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full mt-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      rows="5"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full mt-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "resumes" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Resumes & Uploads</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg font-medium">Total Resumes</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.totalResumes}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg font-medium">ATS Reports</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.totalReports}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-gray-500">
                  Visit{" "}
                  <a href="/resume-history" className="text-blue-600 underline">
                    Resume History
                  </a>{" "}
                  to view and manage all your resumes.
                </p>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Activity Log</h3>
                <div className="space-y-4">
                  {[
                    { action: "Profile Updated", date: user?.updatedAt },
                    { action: "Resume Uploaded", date: user?.lastResumeUpload },
                    { action: "ATS Report Generated", date: user?.lastReport },
                  ].map(
                    (item, idx) =>
                      item.date && (
                        <div
                          key={idx}
                          className="flex items-center gap-4 py-2 border-b"
                        >
                          <div className="bg-blue-100 p-2 rounded-full">
                            <span className="text-blue-600 text-sm">📄</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.action}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                  {!user?.updatedAt && (
                    <p className="text-gray-500">No recent activity recorded.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;