function Features() {
  const features = [
    {
      title: "ATS Score Analysis",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
        </svg>
      ),
      color: "#2563eb",
      bg: "#eff6ff",
      description: "Instantly measure how well your resume aligns with any job posting. Our engine scores format, structure, and keyword density the same way real ATS platforms do.",
    },
    {
      title: "Keyword Matching",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      color: "#0891b2",
      bg: "#ecfeff",
      description: "Side-by-side comparison of your resume against the job description. Every matched and missing keyword is highlighted so you know exactly where to focus.",
    },
    {
      title: "Missing Skills Detection",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      color: "#d97706",
      bg: "#fffbeb",
      description: "Uncover the skills and certifications recruiters are looking for that your resume currently lacks. Close those gaps before your resume even reaches a hiring manager.",
    },
    {
      title: "Resume History",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>
        </svg>
      ),
      color: "#7c3aed",
      bg: "#f5f3ff",
      description: "Every version of your resume is saved and tracked. Compare scores across drafts, see your improvement over time, and always revert to a previous version.",
    },
    {
      title: "Smart Suggestions",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/><path d="M9.5 17.5h5"/>
        </svg>
      ),
      color: "#059669",
      bg: "#ecfdf5",
      description: "Receive AI-powered, line-by-line recommendations that are tailored to the specific job. Stronger action verbs, better formatting, sharper bullets — all contextual.",
    },
    {
      title: "Secure Storage",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      color: "#dc2626",
      bg: "#fef2f2",
      description: "Your documents are encrypted and stored privately. We never share, sell, or use your data to train models. Your career information stays yours — always.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .feat-root {
          padding: 100px 0 110px;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
        }

        .feat-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .feat-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .feat-eyebrow-line {
          width: 32px;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
        }

        .feat-eyebrow-text {
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .feat-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 auto 16px;
        }

        .feat-subheading {
          text-align: center;
          color: #64748b;
          font-size: 17px;
          line-height: 1.65;
          max-width: 540px;
          margin: 0 auto 64px;
        }

        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feat-card {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px 28px;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          position: relative;
          overflow: hidden;
        }

        .feat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
          border-radius: 20px 20px 0 0;
        }

        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.09);
          border-color: #e2e8f0;
        }

        .feat-card:hover::before {
          transform: scaleX(1);
        }

        .feat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          background: var(--card-bg);
          color: var(--card-color);
        }

        .feat-card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feat-card-desc {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
          .feat-inner { padding: 0 24px; }
        }

        @media (max-width: 600px) {
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="features" className="feat-root">
        <div className="feat-inner">

          <div className="feat-eyebrow">
            <span className="feat-eyebrow-line" />
            <span className="feat-eyebrow-text">Why Choose Us</span>
            <span className="feat-eyebrow-line" />
          </div>

          <h2 className="feat-heading">Powerful Features Built<br />for Job Seekers</h2>
          <p className="feat-subheading">
            Everything you need to understand exactly why your resume is getting filtered out — and how to fix it fast.
          </p>

          <div className="feat-grid">
            {features.map((f) => (
              <div
                key={f.title}
                className="feat-card"
                style={{ "--card-color": f.color, "--card-bg": f.bg }}
              >
                <div className="feat-icon-wrap">{f.icon}</div>
                <div className="feat-card-title">{f.title}</div>
                <div className="feat-card-desc">{f.description}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default Features;