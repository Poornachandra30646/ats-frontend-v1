import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-root {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          font-family: 'DM Sans', sans-serif;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #2563eb;
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-logo-dot {
          width: 8px;
          height: 8px;
          background: #2563eb;
          border-radius: 50%;
          display: inline-block;
        }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-size: 15px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
          transition: width 0.25s;
        }

        .nav-links a:hover {
          color: #1e40af;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .nav-btn-login {
          padding: 9px 22px;
          border-radius: 10px;
          border: 1.5px solid #2563eb;
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-btn-login:hover {
          background: #eff6ff;
        }

        .nav-btn-signup {
          padding: 9px 22px;
          border-radius: 10px;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
        }

        .nav-btn-signup:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-inner { padding: 0 24px; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-dot" />
            ATS Resume Checker
          </Link>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="nav-actions">
            <Link to="/login" className="nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn-signup">Get Started</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;