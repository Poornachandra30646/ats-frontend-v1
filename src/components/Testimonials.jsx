function Testimonials() {
  const testimonials = [
    {
      name: "Yaswanth",
      role: "Software Engineer",
      company: "PC AI TECHNOLOGIES",
      initials: "Y",
      color: "#2563eb",
      rating: 5,
      text: "My ATS score jumped from 52% to 87% after following the suggestions. Within two weeks I had three interview calls from companies I had been applying to for months.",
    },
    {
      name: "Chandu",
      role: "FullStack Developer",
      company: "Infosys",
      initials: "C",
      color: "#7c3aed",
      rating: 5,
      text: "The keyword suggestions were incredibly specific — not just generic advice. I could see exactly which terms the recruiter's ATS was scanning for and fix them instantly.",
    },
    {
      name: "Gem",
      role: "Data Analyst",
      company: "Wipro",
      initials: "G",
      color: "#059669",
      rating: 5,
      text: "Clean, simple, and genuinely powerful. It told me my resume format was confusing the ATS parser — something I would never have caught on my own. Highly recommended.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Resumes Scanned" },
    { value: "92%",  label: "ATS Accuracy Rate" },
    { value: "3×",   label: "More Interview Calls" },
    { value: "4.9★", label: "Average User Rating" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .testi-root {
          padding: 100px 0 0;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .testi-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
        }

        .testi-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        /* Eyebrow */
        .testi-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .testi-eyebrow-line {
          width: 32px; height: 2px;
          background: #2563eb; border-radius: 2px;
        }
        .testi-eyebrow-text {
          font-size: 13px; font-weight: 700;
          color: #2563eb; letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .testi-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 auto 14px;
        }

        .testi-sub {
          text-align: center;
          color: #64748b;
          font-size: 17px;
          line-height: 1.65;
          max-width: 480px;
          margin: 0 auto 60px;
        }

        /* Cards grid */
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .testi-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: transform 0.25s, box-shadow 0.25s;
          position: relative;
        }

        .testi-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.09);
        }

        /* Giant quote mark */
        .testi-quote-mark {
          font-family: Georgia, serif;
          font-size: 72px;
          line-height: 0.6;
          color: var(--card-color);
          opacity: 0.18;
          position: absolute;
          top: 24px;
          right: 28px;
          user-select: none;
        }

        /* Stars */
        .testi-stars {
          display: flex;
          gap: 3px;
        }

        .testi-star {
          color: #f59e0b;
          font-size: 15px;
        }

        .testi-text {
          font-size: 15px;
          color: #475569;
          line-height: 1.75;
          flex: 1;
        }

        /* Author row */
        .testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .testi-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--card-color);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .testi-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .testi-role-line {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Stats bar */
        .testi-stats-bar {
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%);
          padding: 52px 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
          overflow: hidden;
        }

        .testi-stats-bar::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          top: -160px;
          left: -60px;
          pointer-events: none;
        }

        .testi-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          z-index: 1;
        }

        .testi-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(255,255,255,0.18);
        }

        .testi-stat-val {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .testi-stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
          .testi-stats-bar { grid-template-columns: repeat(2, 1fr); padding: 40px 28px; }
          .testi-inner { padding: 0 24px; }
        }

        @media (max-width: 480px) {
          .testi-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .testi-stat:not(:last-child)::after { display: none; }
        }
      `}</style>

      <section className="testi-root">
        <div className="testi-inner">

          <div className="testi-eyebrow">
            <span className="testi-eyebrow-line" />
            <span className="testi-eyebrow-text">User Stories</span>
            <span className="testi-eyebrow-line" />
          </div>

          <h2 className="testi-heading">What Our Users Say</h2>
          <p className="testi-sub">
            Real results from real job seekers who stopped getting filtered out.
          </p>

          <div className="testi-grid">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testi-card"
                style={{ "--card-color": t.color }}
              >
                <span className="testi-quote-mark">"</span>

                <div className="testi-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="testi-star">★</span>
                  ))}
                </div>

                <p className="testi-text">"{t.text}"</p>

                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role-line">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar — full bleed */}
        <div className="testi-stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="testi-stat">
              <span className="testi-stat-val">{s.value}</span>
              <span className="testi-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Testimonials;