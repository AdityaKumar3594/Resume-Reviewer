import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/landing.scss";
import { useAuth } from "../../auth/hooks/useAuth.js";

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    };
    if (loginOpen) {
      document.addEventListener("mousedown", handleOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [loginOpen]);

  return (
    <div className="landing-page">
      <header className="landing-hero">
        <nav className="landing-nav">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">IQ</span>
            <span className="brand-name">InterviewIQ</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#process">Process</a>
            <a href="#footer">Support</a>
          </div>

          <div className="nav-actions" ref={dropdownRef}>
            <button
              className="landing-btn landing-btn--ghost landing-btn--dropdown"
              type="button"
              aria-haspopup="true"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((prev) => !prev)}
            >
              Login
              <span className="chevron" aria-hidden="true">▾</span>
            </button>
            <div className={`login-dropdown ${loginOpen ? "login-dropdown--open" : ""}`} role="menu">
              {user ? (
                <Link role="menuitem" to="/home" onClick={() => setLoginOpen(false)}>Continue to Dashboard</Link>
              ) : (
                <>
                  <Link role="menuitem" to="/login" onClick={() => setLoginOpen(false)}>Login</Link>
                  <Link role="menuitem" to="/register" onClick={() => setLoginOpen(false)}>Create account</Link>
                </>
              )}
            </div>
            <Link className="landing-btn landing-btn--primary" to="/register">Get Started</Link>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-kicker">AI-Powered Interview Prep</p>
            <h1>Turn any job description into a focused, personalized interview plan.</h1>
            <p className="hero-subtitle">
              Upload your resume or drop a quick summary. We generate a tailored strategy, mock questions, and a roadmap in minutes.
            </p>
            <div className="hero-actions">
              <Link className="landing-btn landing-btn--primary" to="/register">Start Free</Link>
              <Link className="landing-btn landing-btn--outline" to="/login">I already have an account</Link>
            </div>
            <div className="hero-proof">
              <div className="proof-card">
                <strong>3 min</strong>
                <span>Average setup time</span>
              </div>
              <div className="proof-card">
                <strong>6 sections</strong>
                <span>Custom interview plan</span>
              </div>
              <div className="proof-card">
                <strong>24/7</strong>
                <span>Access to reports</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <div className="panel-header">
                <span>Today&apos;s Focus</span>
                <span className="status-pill">Ready</span>
              </div>
              <h3>Product Designer - Fintech</h3>
              <p>Craft behavioral stories, product thinking, and system design checkpoints.</p>
              <div className="panel-list">
                <div className="panel-item">
                  <span className="dot" />
                  <span>Top skills: UX, metrics, storytelling</span>
                </div>
                <div className="panel-item">
                  <span className="dot" />
                  <span>Mock Qs: 12 high-signal prompts</span>
                </div>
                <div className="panel-item">
                  <span className="dot" />
                  <span>Personalized weaknesses checklist</span>
                </div>
              </div>
              <button className="landing-btn landing-btn--glass" type="button">Preview a Sample</button>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="landing-section">
        <div className="section-header">
          <h2>Everything you need to walk in confident.</h2>
          <p>From resume parsing to interview day notes, everything stays in one place.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Resume + JD intelligence</h3>
            <p>Match your experience to the role and highlight your best talking points.</p>
          </div>
          <div className="feature-card">
            <h3>Role-specific mock questions</h3>
            <p>Get tailored questions and rubrics based on company and role.</p>
          </div>
          <div className="feature-card">
            <h3>Actionable improvement plan</h3>
            <p>Know exactly what to practice next with clear priorities.</p>
          </div>
        </div>
      </section>

      <section id="process" className="landing-section process-section">
        <div className="section-header">
          <h2>How it works</h2>
          <p>Simple steps to go from job post to ready-for-interview.</p>
        </div>
        <div className="process-steps">
          <div className="process-step">
            <span className="step-index">01</span>
            <h3>Share your job description</h3>
            <p>Paste the listing and the role requirements.</p>
          </div>
          <div className="process-step">
            <span className="step-index">02</span>
            <h3>Upload resume or summary</h3>
            <p>Drag and drop your resume or add a quick intro.</p>
          </div>
          <div className="process-step">
            <span className="step-index">03</span>
            <h3>Get a focused plan</h3>
            <p>Instant interview strategy and practice roadmap.</p>
          </div>
        </div>
      </section>

      <section className="landing-section cta-section">
        <div className="cta-card">
          <div>
            <h2>Ready to practice smarter?</h2>
            <p>Log in to pick up where you left off, or start a new interview plan in minutes.</p>
          </div>
          <div className="cta-actions">
            <Link className="landing-btn landing-btn--primary" to="/login">Login</Link>
            <Link className="landing-btn landing-btn--outline" to="/register">Create Account</Link>
          </div>
        </div>
      </section>

      <footer id="footer" className="landing-footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">IQ</span>
          <div>
            <strong>InterviewIQ</strong>
            <p>Own every interview with clarity and confidence.</p>
          </div>
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
