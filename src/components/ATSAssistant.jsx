import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import api
from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  useLocation
} from "react-router-dom";

import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTrash
} from "react-icons/fa";

const DRAG_THRESHOLD = 5;
const BUTTON_SIZE = 64;
const MARGIN = 20;

function ATSAssistant({ reportId }) {

  const [isOpen,
    setIsOpen] =
    useState(false);

  const {
    token,
    user
  } = useAuth();

  const location =
    useLocation();

  const effectiveReportId =
    reportId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("latestReportId")
      : null);

  const [messages,
    setMessages] =
    useState([]);

  const [input,
    setInput] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const [position,
    setPosition] =
    useState(() => {
      const saved = localStorage.getItem("atsBotPosition");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            x: Math.min(Math.max(parsed.x, MARGIN), window.innerWidth - BUTTON_SIZE - MARGIN),
            y: Math.min(Math.max(parsed.y, MARGIN), window.innerHeight - BUTTON_SIZE - MARGIN),
          };
        } catch (e) {}
      }
      return {
        x: window.innerWidth - BUTTON_SIZE - MARGIN,
        y: window.innerHeight - BUTTON_SIZE - MARGIN,
      };
    });

  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonStartPos = useRef({ x: 0, y: 0 });

  const [historyLoaded, setHistoryLoaded] = useState(false);

// Reset chat when user changes
useEffect(() => {

  setMessages([]);

  setHistoryLoaded(false);

}, [user?._id]);

// Load chat history from localStorage
useEffect(() => {

  if (!user || !token || historyLoaded) {
    return;
  }

  const saved =
    localStorage.getItem(
      `ats_chat_history_${user._id}`
    );

  if (saved) {

    try {

      const parsed =
        JSON.parse(saved);

      if (
        Array.isArray(parsed)
      ) {

        setMessages(
          parsed.slice(-20)
        );

      }

    } catch (error) {

      console.error(
        "History Load Error:",
        error
      );

    }

  }

  setHistoryLoaded(true);

}, [user, token, historyLoaded]);

// Save last 20 messages to localStorage
useEffect(() => {

  if (
    user &&
    historyLoaded
  ) {

    const toSave =
      messages.slice(-20);

    localStorage.setItem(
      `ats_chat_history_${user._id}`,
      JSON.stringify(toSave)
    );

  }

}, [messages, user, historyLoaded]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    buttonStartPos.current = { x: position.x, y: position.y };
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!buttonStartPos.current) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    const newX = buttonStartPos.current.x + dx;
    const newY = buttonStartPos.current.y + dy;
    // Only consider it a drag if moved enough
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      isDragging.current = true;
    }
    // Always update position if we started moving
    if (isDragging.current) {
      setPosition({
        x: Math.min(Math.max(newX, MARGIN), window.innerWidth - BUTTON_SIZE - MARGIN),
        y: Math.min(Math.max(newY, MARGIN), window.innerHeight - BUTTON_SIZE - MARGIN),
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!buttonStartPos.current) return;
    if (isDragging.current) {
      // Snap to nearest edge
      const centerX = position.x + BUTTON_SIZE / 2;
      const snapX = centerX < window.innerWidth / 2
        ? MARGIN
        : window.innerWidth - BUTTON_SIZE - MARGIN;
      setPosition(prev => ({ ...prev, x: snapX }));
    } else {
      // It was a click, toggle open/close
      setIsOpen(prev => !prev);
    }
    isDragging.current = false;
    dragStartPos.current = null;
    buttonStartPos.current = null;
  }, [position]);

  // Attach global listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Persist position on change
  useEffect(() => {
    localStorage.setItem("atsBotPosition", JSON.stringify(position));
  }, [position]);

  // Clear chat
  const handleClearChat = useCallback(() => {
    if (user) {
      localStorage.removeItem(`ats_chat_history_${user._id}`);
    }
    setMessages([]);
    // greeting will be shown again due to messages.length becoming 0
  }, [user]);

  const handleQuickAction =
    useCallback(
      async (question) => {

        if (!token) {
          return;
        }

        setInput("");

        setMessages(
          prev => [
            ...prev,
            {
              sender: "user",
              text: question
            }
          ]
        );

        setLoading(true);

        try {

          const payload = {
            message: question
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch {

          setMessages(
            prev => [
              ...prev,
              {
                sender: "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, effectiveReportId]
    );

  const handleSend =
    useCallback(
      async () => {

        if (!token) {
          return;
        }

        if (
          !input.trim()
        )
          return;

        const userMessage =
          input;

        setMessages(
          prev => [
            ...prev,
            {
              sender:
                "user",
              text:
                userMessage
            }
          ]
        );

        setInput("");

        setLoading(true);

        try {

          const payload = {
            message:
              userMessage
          };

          if (effectiveReportId) {
            payload.reportId =
              effectiveReportId;
          }

          const response =
            await api.post(

              "/chat",

              payload,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  response.data.reply
              }
            ]
          );

        } catch (error) {

          setMessages(
            prev => [
              ...prev,
              {
                sender:
                  "bot",
                text:
                  "Sorry, I am unable to respond right now."
              }
            ]
          );

        } finally {

          setLoading(false);

        }

      },
      [token, input, effectiveReportId]
    );

  // Greeting effect (runs only after history load attempt)
  useEffect(() => {
    if (user && token && historyLoaded && messages.length === 0) {
      const path = location.pathname;
      let greeting = "";

      if (path.startsWith("/dashboard")) {
        greeting = `Hi ${user.name} 👋

You're on your ATS Dashboard.

Need help analyzing a resume?

Try:
• Improve Resume
• ATS Score Tips
• Resume Suggestions`;
      } else if (path.startsWith("/upload-resume")) {
        greeting = `Hi ${user.name} 👋

Ready to upload a resume?

Supported:
• PDF
• DOCX

After upload I can help improve your ATS score.`;
      } else if (path.startsWith("/resume-history")) {
        greeting = `Hi ${user.name} 👋

You're viewing your resume history.

I can help compare ATS performance across resumes.`;
      } else if (path.startsWith("/reports")) {
        greeting = `Hi ${user.name} 👋

You're viewing ATS reports.

Ask me:
• Explain ATS Score
• Missing Keywords
• Resume Improvements`;
      } else if (path.startsWith("/report/")) {
        greeting = `Hi ${user.name} 👋

I can explain this report.

Try:
• Explain ATS Score
• Missing Keywords
• Skill Gaps
• Interview Questions`;
      } else if (path.startsWith("/profile")) {
        greeting = `Hi ${user.name} 👋

You're viewing your profile.

I can help improve your ATS profile and career roadmap.`;
      } else {
        greeting = `Hi ${user.name} 👋

Welcome back!

I am your ATS Career Coach.

I can help with:

✓ ATS Score Analysis
✓ Missing Keywords
✓ Resume Improvement
✓ Interview Preparation
✓ Career Roadmap

Choose an option below or ask me anything.`;
      }

      setMessages([
        {
          sender: "bot",
          text: greeting
        }
      ]);
    }
  }, [user, token, location.pathname, messages.length, historyLoaded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isAuthenticated = !!token && !!user;
  const shouldShowQuickActions = messages.length <= 1;

  return (
    <div>
      {/* CHAT WINDOW */}
      {isOpen && isAuthenticated && (
        <div
          style={{
            right: "1rem",
            bottom: "5rem"
          }}
          className="fixed z-[10000] w-full max-w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:w-96 sm:w-[90vw] sm:h-[70vh] sm:max-h-[600px]"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FaRobot size={20} />
              </div>
              <div>
                <h2 className="font-bold text-base">ATS Coach</h2>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="hover:bg-blue-500 p-2 rounded-lg transition-colors duration-200"
                title="Clear chat"
              >
                <FaTrash size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-500 p-2 rounded-lg transition-colors duration-200"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl break-words text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {shouldShowQuickActions && (
              <div className="flex flex-wrap gap-2 mt-4 pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("Explain my ATS score")}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📊 Explain My Score
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("How can I reach 90% ATS score?")}
                  className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎯 Reach 90% ATS
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("What keywords am I missing?")}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🔍 Missing Keywords
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("How can I improve my resume?")}
                  className="text-xs bg-teal-100 hover:bg-teal-200 text-teal-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✨ Improve Resume
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("Generate interview questions based on my skills")}
                  className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💼 Interview Questions
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickAction("Generate a career roadmap based on my ATS report")}
                  className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🛣 Career Roadmap
                </button>
              </div>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT SECTION */}
          <div className="border-t border-gray-200 bg-white p-4 flex gap-2 sticky bottom-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading && input.trim()) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={loading}
            />
            <button
              type="button"
              disabled={loading || !input.trim()}
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg active:scale-95"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      {isAuthenticated && (
        <div
          onMouseDown={handleMouseDown}
          style={{
            left: position.x,
            top: position.y,
            transition: "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
          }}
          className="fixed z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-2xl cursor-grab hover:scale-110 active:cursor-grabbing select-none"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 animate-pulse" />
          <FaRobot size={24} />
        </div>
      )}
    </div>
  );
}

export default ATSAssistant;