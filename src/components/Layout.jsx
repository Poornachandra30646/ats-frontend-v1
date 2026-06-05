import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Upload Resume", path: "/upload-resume", icon: <FaUpload /> },
    { name: "Resume History", path: "/resume-history", icon: <FaHistory /> },
    { name: "ATS Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="text-2xl font-bold p-6 border-b border-slate-700">
          ATS Resume Checker
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile & Logout (always visible at bottom) */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <img
  src={
    user?.profileImage ||
    "https://ui-avatars.com/api/?name=User"
  }
  alt="profile"
  className="w-12 h-12 rounded-full object-cover"
  onError={(e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=User";
  }}
/>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-slate-400">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content offset by sidebar width */}
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  );
}

export default Layout;