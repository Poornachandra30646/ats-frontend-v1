function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description:
        "Drag and drop or browse to upload your resume in PDF, DOC, or DOCX format. Your file is encrypted and processed privately.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      ),
      color: "#2563eb",
      lightBg: "#eff6ff",
    },
    {
      number: "02",
      title: "Paste Job Description",
      description:
        "Copy and paste the job listing you're applying to. Our engine extracts every required skill, keyword, and qualification automatically.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
          <line x1="8" y1="17" x2="13" y2="17"/>
        </svg>
      ),
      color: "#0891b2",
      lightBg: "#ecfeff",
    },
    {
      number: "03",
      title: "Receive ATS Analysis",
      description:
        "Get a real-time ATS score, keyword match breakdown, and a list of missing skills with actionable improvement tips — in seconds.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      ),
      color: "#7c3aed",
      lightBg: "#f5f3ff",
    },
    {
      number: "04",
      title: "Optimize & Apply",
      description:
        "Apply every suggestion, re-scan your updated resume, watch your score climb, then apply with confidence knowing you'll pass the filter.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      color: "#059669",
      lightBg: "#ecfdf5",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .hiw-root {
          padding: 100px 0 110px;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .hiw-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
        }

        .hiw-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .hiw-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .hiw-eyebrow-line {
          width: 32px;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
        }

        .hiw-eyebrow-text {
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hiw-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 auto 16px;
        }

        .hiw-subheading {
          text-align: center;
          color: #64748b;
          font-size: 17px;
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 72px;
        }

        /* Steps grid */
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        /* Connector line between steps */
        .hiw-steps::before {
          content: '';
          position: absolute;
          top: 44px;
          left: calc(12.5% + 28px);
          right: calc(12.5% + 28px);
          height: 2px;
          background: linear-gradient(90deg, #bfdbfe, #93c5fd, #bfdbfe);
          z-index: 0;
        }

        .hiw-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        /* Step number circle */
        .hiw-step-circle {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--step-bg);
          border: 2px solid var(--step-color);
          margin-bottom: 28px;
          position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
          color: var(--step-color);
        }

        .hiw-step:hover .hiw-step-circle {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.10);
        }

        .hiw-step-num {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--step-color);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bricolage Grotesque', sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .hiw-step-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .hiw-step-desc {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.7;
        }

        /* Bottom CTA strip */
        .hiw-cta-strip {
          margin-top: 72px;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
          border-radius: 24px;
          padding: 52px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          box-shadow: 0 12px 40px rgba(37, 99, 235, 0.28);
          overflow: hidden;
          position: relative;
        }

        .hiw-cta-strip::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          top: -80px;
          right: 120px;
          pointer-events: none;
        }

        .hiw-cta-text-wrap {
          position: relative;
          z-index: 1;
        }

        .hiw-cta-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .hiw-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.78);
        }

        .hiw-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #1d4ed8;
          padding: 15px 32px;
          border-radius: 13px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .hiw-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }

        @media (max-width: 900px) {
          .hiw-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .hiw-steps::before { display: none; }
          .hiw-inner { padding: 0 24px; }
          .hiw-cta-strip { flex-direction: column; text-align: center; }
        }

        @media (max-width: 560px) {
          .hiw-steps { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="how" className="hiw-root">
        <div className="hiw-inner">

          <div className="hiw-eyebrow">
            <span className="hiw-eyebrow-line" />
            <span className="hiw-eyebrow-text">Simple Process</span>
            <span className="hiw-eyebrow-line" />
          </div>

          <h2 className="hiw-heading">How It Works</h2>
          <p className="hiw-subheading">
            From upload to optimized resume in under two minutes. No account needed to get your first score.
          </p>

          <div className="hiw-steps">
            {steps.map((step) => (
              <div
                key={step.number}
                className="hiw-step"
                style={{ "--step-color": step.color, "--step-bg": step.lightBg }}
              >
                <div className="hiw-step-circle">
                  {step.icon}
                  <span className="hiw-step-num">{step.number}</span>
                </div>
                <div className="hiw-step-title">{step.title}</div>
                <div className="hiw-step-desc">{step.description}</div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="hiw-cta-strip">
            <div className="hiw-cta-text-wrap">
              <div className="hiw-cta-title">Ready to Beat the ATS?</div>
              <div className="hiw-cta-sub">Free scan. No credit card. Results in seconds.</div>
            </div>
            <a href="/signup" className="hiw-cta-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Scan My Resume Free
            </a>
          </div>

        </div>
      </section>
    </>
  );
}

export default HowItWorks;