import { useState } from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for a quick scan before your next application.",
      color: "#2563eb",
      bg: "#eff6ff",
      border: "#bfdbfe",
      features: [
        "3 resume scans per month",
        "ATS compatibility score",
        "Basic keyword match report",
        "PDF & DOCX support",
      ],
      cta: "Get Started Free",
      to: "/signup",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "For active job seekers who need every edge they can get.",
      color: "#fff",
      bg: "linear-gradient(145deg, #1e40af 0%, #2563eb 55%, #3b82f6 100%)",
      border: "transparent",
      features: [
        "Unlimited resume scans",
        "Advanced ATS analysis",
        "AI-powered line suggestions",
        "Full keyword gap breakdown",
        "Resume version history",
        "Priority support",
      ],
      cta: "Start Pro — ₹299/mo",
      to: "/signup",
      highlight: true,
      badge: "Most Popular",
      comingSoon: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Built for recruitment agencies and HR teams at scale.",
      color: "#2563eb",
      bg: "#f8fafc",
      border: "#e2e8f0",
      features: [
        "Unlimited team seats",
        "Centralized admin dashboard",
        "Bulk resume processing",
        "Analytics & reporting suite",
        "SSO & role-based access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      to: "/contact",
      highlight: false,
      comingSoon: true,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .price-root {
          padding: 100px 0 110px;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
        }

        .price-inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .price-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .price-eyebrow-line {
          width: 32px; height: 2px;
          background: #2563eb; border-radius: 2px;
        }
        .price-eyebrow-text {
          font-size: 13px; font-weight: 700;
          color: #2563eb; letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .price-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 800;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 auto 14px;
        }

        .price-sub {
          text-align: center;
          color: #64748b;
          font-size: 17px;
          line-height: 1.65;
          max-width: 480px;
          margin: 0 auto 64px;
        }

        .price-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }

        /* Card base */
        .price-card {
          border-radius: 22px;
          padding: 36px 32px;
          border: 1.5px solid var(--card-border);
          background: var(--card-bg);
          position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .price-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }

        .price-card.highlighted {
          box-shadow: 0 12px 48px rgba(37, 99, 235, 0.30);
          transform: translateY(-8px);
        }

        .price-card.highlighted:hover {
          transform: translateY(-14px);
          box-shadow: 0 24px 56px rgba(37, 99, 235, 0.36);
        }

        /* Popular badge */
        .price-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: #f59e0b;
          color: #fff;
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 16px;
          border-radius: 9999px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(245,158,11,0.35);
        }

        .price-plan-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .price-plan-name.light { color: #fff; }
        .price-plan-name.dark  { color: #0f172a; }

        .price-plan-desc {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .price-plan-desc.light { color: rgba(255,255,255,0.72); }
        .price-plan-desc.dark  { color: #64748b; }

        .price-amount {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 4px;
        }

        .price-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 46px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .price-num.light { color: #fff; }
        .price-num.dark  { color: #0f172a; }

        .price-period {
          font-size: 13.5px;
          font-weight: 500;
        }
        .price-period.light { color: rgba(255,255,255,0.60); }
        .price-period.dark  { color: #94a3b8; }

        .price-divider {
          height: 1px;
          margin: 24px 0;
        }
        .price-divider.light { background: rgba(255,255,255,0.18); }
        .price-divider.dark  { background: #e2e8f0; }

        .price-features {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .price-feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14.5px;
          line-height: 1.5;
        }
        .price-feature.light { color: rgba(255,255,255,0.88); }
        .price-feature.dark  { color: #374151; }

        .price-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 10px;
          font-weight: 800;
        }
        .price-check.light { background: rgba(255,255,255,0.22); color: #fff; }
        .price-check.dark  { background: #dbeafe; color: #2563eb; }

        /* CTA button */
        .price-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px 24px;
          border-radius: 13px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .price-btn.light {
          background: rgba(255,255,255,0.95);
          color: #1d4ed8;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
        }
        .price-btn.light:hover {
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.16);
        }

        .price-btn.dark {
          background: #2563eb;
          color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,0.25);
        }
        .price-btn.dark:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.32);
        }

        .price-btn.outline {
          background: transparent;
          color: #2563eb;
          border: 1.5px solid #bfdbfe;
        }
        .price-btn.outline:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

        /* Coming Soon Modal */
        .cs-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: csBackdropIn 0.2s ease;
        }

        @keyframes csBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cs-modal {
          background: #fff;
          border-radius: 24px;
          padding: 48px 44px 40px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          position: relative;
          animation: csModalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes csModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .cs-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
        }

        .cs-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .cs-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        .cs-close {
          display: inline-block;
          background: #2563eb;
          color: #fff;
          padding: 12px 32px;
          border-radius: 11px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.28);
        }

        .cs-close:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .cs-x {
          position: absolute;
          top: 16px; right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          font-size: 20px;
          line-height: 1;
          padding: 4px;
          transition: color 0.15s;
        }
        .cs-x:hover { color: #475569; }

        /* Footer note */
        .price-footer {
          text-align: center;
          margin-top: 36px;
          font-size: 13.5px;
          color: #94a3b8;
        }

        .price-footer a {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .price-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
          .price-card.highlighted { transform: none; }
          .price-inner { padding: 0 24px; }
        }
      `}</style>

      <section id="pricing" className="price-root">
        <div className="price-inner">

          <div className="price-eyebrow">
            <span className="price-eyebrow-line" />
            <span className="price-eyebrow-text">Pricing</span>
            <span className="price-eyebrow-line" />
          </div>

          <h2 className="price-heading">Simple, Transparent Pricing</h2>
          <p className="price-sub">
            No hidden fees. Start free, upgrade when you're ready for the full toolkit.
          </p>

          <div className="price-grid">
            {plans.map((plan) => {
              const isLight = plan.highlight;
              const tone = isLight ? "light" : "dark";
              const btnStyle = isLight ? "light" : plan.name === "Enterprise" ? "outline" : "dark";

              return (
                <div
                  key={plan.name}
                  className={`price-card${plan.highlight ? " highlighted" : ""}`}
                  style={{
                    "--card-bg": plan.bg,
                    "--card-border": plan.border,
                    background: plan.bg,
                  }}
                >
                  {plan.badge && <span className="price-badge">{plan.badge}</span>}

                  <div className={`price-plan-name ${tone}`}>{plan.name}</div>
                  <div className={`price-plan-desc ${tone}`}>{plan.description}</div>

                  <div className="price-amount">
                    <span className={`price-num ${tone}`}>{plan.price}</span>
                    <span className={`price-period ${tone}`}>{plan.period}</span>
                  </div>

                  <div className={`price-divider ${tone}`} />

                  <ul className="price-features">
                    {plan.features.map((f) => (
                      <li key={f} className={`price-feature ${tone}`}>
                        <span className={`price-check ${tone}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {plan.comingSoon ? (
                    <button
                      onClick={() => setShowModal(true)}
                      className={`price-btn ${btnStyle}`}
                      style={{ width: "100%", cursor: "pointer" }}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link to={plan.to} className={`price-btn ${btnStyle}`}>
                      {plan.cta}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <p className="price-footer">
            All plans include a 7-day free trial. No credit card required. &nbsp;
            <a href="#contact">Questions? Talk to us →</a>
          </p>
        </div>

        {/* Coming Soon Modal */}
        {showModal && (
          <div className="cs-backdrop" onClick={() => setShowModal(false)}>
            <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
              <button className="cs-x" onClick={() => setShowModal(false)}>✕</button>
              <div className="cs-icon">🚀</div>
              <div className="cs-title">Coming Soon!</div>
              <p className="cs-desc">
                We're still building this out. Pro and Enterprise plans will be available very soon — stay tuned for the launch!
              </p>
              <button className="cs-close" onClick={() => setShowModal(false)}>
                Got it!
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Pricing;