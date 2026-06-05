import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import ATSAssistant from "./components/ATSAssistant";
import { useAuth } from "./context/AuthContext";

function ChatWrapper() {
  const { token } = useAuth();
  const path = window.location.pathname;

  const protectedExact = [
    "/dashboard",
    "/upload-resume",
    "/resume-history",
    "/reports",
    "/profile"
  ];

  const isProtected =
    protectedExact.includes(path) ||
    path.startsWith("/report/") ||
    path.startsWith("/analyze/");

  if (!token || !isProtected) {
    return null;
  }

  return <ATSAssistant />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ChatWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;