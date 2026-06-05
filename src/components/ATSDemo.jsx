function ATSDemo() {
  const matchedKeywords = [
    { label: "React", weight: "Core" },
    { label: "Node.js", weight: "Core" },
    { label: "MongoDB", weight: "Core" },
    { label: "REST APIs", weight: "Mid" },
    { label: "JavaScript", weight: "Core" },
    { label: "Git", weight: "Mid" },
  ];

  const missingKeywords = [
    { label: "Docker", weight: "High" },
    { label: "AWS", weight: "High" },
    { label: "TypeScript", weight: "Mid" },
    { label: "CI/CD", weight: "Mid" },
  ];

  const score = 83;
  const circumference = 2 * Math.PI * 42; // r=42
  const dashOffset = circumference - (score / 100) * circumference;

  const sections = [
    { label: "Keyword Match", value: 83, color: "#2563eb" },
    { label: "Format Score", value: 91, color: "#059669" },
    { label: "Readability",  value: 76, color: "#7c3aed" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .demo-root {
          padding: 100px 0 110px;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
        }

        .demo-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .demo-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .demo-eyebrow-line {
          width: 32px; height: 2px;
          background: #2563eb; border-radius: 2px;
        }
        .demo-eyebrow-text {
          font-size: 13px; font-weight: 700;
          color: #2563eb; letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .demo-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 auto 14px;
        }

        .demo-sub {
          text-align: center;
          color: #64748b;
          font-size: 17px;
          line-height: 1.65;
          max-width: 500px;
          margin: 0 auto 56px;
        }

        /* Main card */
        .demo-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 44px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .demo-card-top {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 48px;
          align-items: center;
          padding-bottom: 36px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 36px;
        }

        /* Circular score */
        .score-ring-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .score-ring {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .score-ring svg {
          transform: rotate(-90deg);
        }

        .score-ring-track {
          fill: none;
          stroke: #e2e8f0;
          stroke-width: 8;
        }

        .score-ring-fill {
          fill: none;
          stroke: #2563eb;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: ${circumference};
          stroke-dashoffset: ${dashOffset};
          transition: stroke-dashoffset 1s ease;
        }

        .score-ring-label {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-ring-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }

        .score-ring-pct {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .score-ring-caption {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          text-align: center;
        }

        /* Mini bars */
        .score-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .score-bar-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .score-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .score-bar-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
        }

        .score-bar-val {
          font-size: 13px;
          font-weight: 700;
          color: var(--bar-color);
        }

        .score-bar-track {
          height: 7px;
          background: #e2e8f0;
          border-radius: 99px;
          overflow: hidden;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: var(--bar-color);
          width: var(--bar-width);
          transition: width 1s ease;
        }

        /* Keywords grid */
        .demo-kw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .kw-col-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .kw-col-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .kw-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .kw-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: transform 0.18s, box-shadow 0.18s;
        }

        .kw-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .kw-pill.match {
          background: #f0fdf4;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .kw-pill.miss {
          background: #fff7f7;
          color: #dc2626;
          border-color: #fecaca;
        }

        .kw-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .kw-badge.core { background: #dcfce7; color: #16a34a; }
        .kw-badge.mid  { background: #e0f2fe; color: #0369a1; }
        .kw-badge.high { background: #fee2e2; color: #dc2626; }

        /* Bottom note */
        .demo-note {
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #94a3b8;
        }

        .demo-note-dot { color: #22c55e; font-size: 16px; }

        @media (max-width: 768px) {
          .demo-card { padding: 28px 24px; }
          .demo-card-top { grid-template-columns: 1fr; gap: 28px; }
          .demo-kw-grid { grid-template-columns: 1fr; }
          .demo-inner { padding: 0 24px; }
        }
      `}</style>

      <section className="demo-root">
        <div className="demo-inner">

          <div className="demo-eyebrow">
            <span className="demo-eyebrow-line" />
            <span className="demo-eyebrow-text">Live Preview</span>
            <span className="demo-eyebrow-line" />
          </div>

          <h2 className="demo-heading">See What Your Analysis Looks Like</h2>
          <p className="demo-sub">
            A real snapshot of the insights you'll receive the moment you scan your resume.
          </p>

          <div className="demo-card">
            {/* Top: score ring + bar breakdown */}
            <div className="demo-card-top">
              <div className="score-ring-wrap">
                <div className="score-ring">
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle className="score-ring-track" cx="50" cy="50" r="42" />
                    <circle className="score-ring-fill" cx="50" cy="50" r="42" />
                  </svg>
                  <div className="score-ring-label">
                    <span className="score-ring-num">83</span>
                    <span className="score-ring-pct">/ 100</span>
                  </div>
                </div>
                <span className="score-ring-caption">Overall ATS Score</span>
              </div>

              <div className="score-bars">
                {sections.map((s) => (
                  <div key={s.label} className="score-bar-row">
                    <div className="score-bar-meta">
                      <span className="score-bar-label">{s.label}</span>
                      <span className="score-bar-val" style={{ "--bar-color": s.color }}>{s.value}%</span>
                    </div>
                    <div className="score-bar-track">
                      <div
                        className="score-bar-fill"
                        style={{ "--bar-color": s.color, "--bar-width": `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="demo-kw-grid">
              <div>
                <div className="kw-col-title">
                  <span className="kw-col-dot" style={{ background: "#22c55e" }} />
                  Matched Keywords
                </div>
                <div className="kw-pills">
                  {matchedKeywords.map((k) => (
                    <span key={k.label} className="kw-pill match">
                      ✓ {k.label}
                      <span className={`kw-badge ${k.weight.toLowerCase()}`}>{k.weight}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="kw-col-title">
                  <span className="kw-col-dot" style={{ background: "#f87171" }} />
                  Missing Keywords
                </div>
                <div className="kw-pills">
                  {missingKeywords.map((k) => (
                    <span key={k.label} className="kw-pill miss">
                      ✕ {k.label}
                      <span className={`kw-badge ${k.weight.toLowerCase()}`}>{k.weight}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="demo-note">
              <span className="demo-note-dot">●</span>
              This is a sample preview — your real results will be based on the actual job description you paste.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

export default ATSDemo;