import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function Hero() {
  const navigate = useNavigate();
  const { setPendingResume } = useResume();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleResumeSelect = (file) => {
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC and DOCX files are allowed");
      return;
    }
    setSelectedFile(file);
    setPendingResume(file);
    sessionStorage.setItem("pendingResumeName", file.name);
    alert("Resume selected. Please login or signup to continue.");
    navigate("/login");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleResumeSelect(file);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .hero-root {
          position: relative;
          overflow: hidden;
          min-height: 88vh;
          display: flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: blur(3px) brightness(0.9);
          transform: scale(1.06);
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(239, 246, 255, 0.91) 0%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(237, 233, 254, 0.82) 100%
          );
          z-index: 1;
        }

        /* decorative blobs */
        .hero-blob-1 {
          position: absolute;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(147,197,253,0.22) 0%, transparent 70%);
          top: -100px;
          right: -80px;
          z-index: 1;
          pointer-events: none;
        }
        .hero-blob-2 {
          position: absolute;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 70%);
          bottom: -60px;
          left: 60px;
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
          padding: 100px 48px 110px;
          text-align: center;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(219, 234, 254, 0.88);
          color: #1d4ed8;
          border: 1px solid rgba(147, 197, 253, 0.55);
          padding: 8px 20px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          backdrop-filter: blur(8px);
          margin-bottom: 32px;
        }

        .hero-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(42px, 6vw, 70px);
          font-weight: 800;
          line-height: 1.08;
          color: #0f172a;
          letter-spacing: -0.025em;
          margin: 0 0 26px;
        }

        .hero-heading .blue-word {
          color: #2563eb;
          position: relative;
          display: inline-block;
        }

        .hero-heading .blue-word::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 0;
          width: 100%;
          height: 7px;
          background: linear-gradient(90deg, #93c5fd 0%, #60a5fa 100%);
          border-radius: 4px;
          opacity: 0.55;
          z-index: -1;
        }

        .hero-description {
          font-size: 18px;
          color: #475569;
          line-height: 1.75;
          margin: 0 auto 44px;
          max-width: 600px;
          font-weight: 400;
        }

        /* Upload zone */
        .upload-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2.5px dashed #93c5fd;
          border-radius: 22px;
          padding: 42px 32px;
          cursor: pointer;
          background: rgba(239, 246, 255, 0.60);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          max-width: 540px;
          margin: 0 auto 20px;
          box-shadow: 0 4px 24px rgba(37, 99, 235, 0.07);
        }

        .upload-zone.drag-over,
        .upload-zone:hover {
          background: rgba(219, 234, 254, 0.75);
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.13);
        }

        .upload-icon-wrap {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 2px 10px rgba(37,99,235,0.12);
          font-size: 32px;
        }

        .upload-main {
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 5px;
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .upload-sub {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }

        .upload-or {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 14px;
        }

        /* Buttons row below upload */
        .hero-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2563eb;
          color: #fff;
          padding: 14px 30px;
          border-radius: 13px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(37, 99, 235, 0.30);
          font-family: 'DM Sans', sans-serif;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37, 99, 235, 0.38);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.88);
          color: #1e293b;
          border: 1.5px solid #e2e8f0;
          padding: 14px 30px;
          border-radius: 13px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-secondary:hover {
          background: #fff;
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }

        /* Trust pills */
        .trust-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(226,232,240,0.8);
          border-radius: 9999px;
          padding: 7px 16px;
          font-size: 13px;
          color: #475569;
          font-weight: 500;
          backdrop-filter: blur(8px);
        }

        .trust-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .hero-content { padding: 72px 24px 80px; }
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />

        <div className="hero-content">
          <div className="hero-badge">
            🚀 Trusted ATS Resume Analysis
          </div>

          <h1 className="hero-heading">
            Beat ATS Filters &amp; Get<br />
            More <span className="blue-word">Interviews</span>
          </h1>

          <p className="hero-description">
            Upload your resume, compare it with job descriptions, discover
            missing keywords, and instantly improve your ATS score.
          </p>

          {/* Upload zone */}
          <label
            className={`upload-zone${dragging ? " drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="upload-icon-wrap">📄</div>
            <div className="upload-main">
              {selectedFile ? selectedFile.name : "Drop your resume here"}
            </div>
            <div className="upload-sub">PDF / DOC / DOCX supported</div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => handleResumeSelect(e.target.files[0])}
            />
          </label>

          <p className="upload-or">— or —</p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Scan Resume Free
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="trust-row">
            <span className="trust-pill"><span className="trust-dot"/>50K+ Resumes Analyzed</span>
            <span className="trust-pill"><span className="trust-dot"/>92% ATS Accuracy</span>
            <span className="trust-pill"><span className="trust-dot"/>4.9★ User Rating</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;