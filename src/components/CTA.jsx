import { Link } from "react-router-dom";

function CTA() {
  const perks = [
    { icon: "⚡", text: "Results in seconds" },
    { icon: "🔒", text: "Private & secure" },
    { icon: "💳", text: "No credit card needed" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .cta-root {
          padding: 100px 0 110px;
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .cta-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
        }

        .cta-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 48px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        /* Blob accents */
        .cta-blob-1 {
          position: absolute;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(147,197,253,0.18) 0%, transparent 70%);
          top: -120px; left: -80px;
          pointer-events: none;
          z-index: 0;
        }
        .cta-blob-2 {
          position: absolute;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(196,181,253,0.14) 0%, transparent 70%);
          bottom: -60px; right: 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Eyebrow */
        .cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(219, 234, 254, 0.80);
          color: #1d4ed8;
          border: 1px solid rgba(147, 197, 253, 0.5);
          padding: 7px 18px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }

        .cta-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin: 0 0 20px;
        }

        .cta-heading .blue {
          color: #2563eb;
          position: relative;
          display: inline-block;
        }

        .cta-heading .blue::after {
          content: '';
          position: absolute;
          bottom: 3px; left: 0;
          width: 100%; height: 6px;
          background: linear-gradient(90deg, #93c5fd, #60a5fa);
          border-radius: 4px;
          opacity: 0.5;
          z-index: -1;
        }

        .cta-sub {
          font-size: 18px;
          color: #475569;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 40px;
        }

        /* Perk pills */
        .cta-perks {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .cta-perk {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.80);
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 8px 18px;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          backdrop-filter: blur(6px);
        }

        /* Buttons */
        .cta-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #2563eb;
          color: #fff;
          padding: 16px 36px;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 22px rgba(37, 99, 235, 0.30);
          font-family: 'DM Sans', sans-serif;
        }

        .cta-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.38);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.90);
          color: #1e293b;
          border: 1.5px solid #e2e8f0;
          padding: 16px 36px;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .cta-btn-secondary:hover {
          background: #fff;
          border-color: #cbd5e1;
          transform: translateY(-3px);
        }

        /* Trust note */
        .cta-trust {
          margin-top: 32px;
          font-size: 13px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .cta-trust-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }

        @media (max-width: 640px) {
          .cta-inner { padding: 0 24px; }
          .cta-btn-primary, .cta-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <section id="contact" className="cta-root">
        <div className="cta-blob-1" />
        <div className="cta-blob-2" />

        <div className="cta-inner">
          <div className="cta-eyebrow">🚀 Free to Start</div>

          <h2 className="cta-heading">
            Ready to Land More<br />
            <span className="blue">Interviews?</span>
          </h2>

          <p className="cta-sub">
            Stop guessing why your resume isn't getting callbacks. Get your ATS score in under 60 seconds — completely free.
          </p>

          <div className="cta-perks">
            {perks.map((p) => (
              <span key={p.text} className="cta-perk">
                {p.icon} {p.text}
              </span>
            ))}
          </div>

          <div className="cta-actions">
            <Link to="/signup" className="cta-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Get Started Free
            </Link>
            <Link to="/login" className="cta-btn-secondary">
              Already have an account? Login →
            </Link>
          </div>

          <p className="cta-trust">
            <span className="cta-trust-dot" />
            Trusted by 50,000+ job seekers &nbsp;·&nbsp; 4.9★ average rating
          </p>
        </div>
      </section>
    </>
  );
}

export default CTA;