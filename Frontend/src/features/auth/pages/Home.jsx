import React from "react";
import { Link } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <nav className="hp-nav">
        <div className="hp-logo">
          <span className="hp-logo-dot" />
        AI ANYLSYER ONLINE
        </div>
        <div className="hp-nav-links">
          <a href="#process" className="hp-nav-link">How it works</a>
          <Link to="/Login" className="hp-nav-link">Log in</Link>
          <Link to="/Register" className="hp-nav-cta">Register</Link>
        </div>
      </nav>

      <section className="hp-hero">
        <div>
        

          <h1 className="hp-headline">
            Debrief your interview.<br />
            Find every <span>gap</span> before they do.
          </h1>

          <p className="hp-subtext">
            Drop in your interview transcript and get a full intelligence
            report back: technical gaps, behavioural read, and a day-by-day
            plan to close the distance before the next round.
          </p>

          <div className="hp-hero-actions">
            <Link to="/Register" className="hp-btn-primary">Open a case file</Link>
            <a href="#process" className="hp-btn-secondary">See how it works →</a>
          </div>

          <div className="hp-stats-row">
            <div>
              <div className="hp-stat-num">04</div>
              <div className="hp-stat-label">REPORT SECTIONS</div>
            </div>
            <div>
              <div className="hp-stat-num">&lt;60s</div>
              <div className="hp-stat-label">TO FIRST READ</div>
            </div>
            <div>
              <div className="hp-stat-num">100%</div>
              <div className="hp-stat-label">YOUR DATA, YOUR FILE</div>
            </div>
          </div>
        </div>

        <div className="hp-terminal">
          <div className="hp-stamp">CLEARED</div>
          <div className="hp-terminal-header">
            <div className="hp-terminal-dots">
              <span /><span /><span />
            </div>
            <div className="hp-terminal-title">analysis.log</div>
          </div>
          <div className="hp-terminal-body">
            <div className="hp-line-q">Walk me through a time you disagreed with a teammate.</div>
            <div className="hp-line-a d1">Clear structure, weak resolution detail.</div>
            <div className="hp-line-a d2">Flag: outcome stated, ownership unclear.</div>
            <div className="hp-line-a d3">Suggested drill added to prep plan.</div>
            <div className="hp-score-card">
              <span className="hp-score-label">MATCH SCORE</span>
              <span className="hp-score-value">78 / 100</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-section" id="process">
        <div className="hp-section-eyebrow">THE PROCESS</div>
        <h2 className="hp-section-title">
          Three steps from raw transcript to a plan you'd actually follow.
        </h2>

        <div className="hp-process-grid">
          <div className="hp-process-card">
            <div className="hp-process-tag">STEP / SUBMIT</div>
            <h3>Hand over the transcript</h3>
            <p>
              Paste or upload the interview, technical or behavioural.
              No formatting required, no cleanup needed.
            </p>
          </div>
          <div className="hp-process-card">
            <div className="hp-process-tag">STEP / ANALYSE</div>
            <h3>The file gets opened</h3>
            <p>
              Every answer is read for substance, structure, and gaps
              against what the role actually expects.
            </p>
          </div>
          <div className="hp-process-card">
            <div className="hp-process-tag">STEP / ACT</div>
            <h3>Get the Anaylsis back</h3>
            <p>
              A match score, a skills-gap breakdown, and a day-by-day
              plan that tells you exactly what to fix next.
            </p>
          </div>
        </div>
      </section>

      <section className="hp-footer-cta">
        <div className="hp-footer-panel">
          <h2>Your next interview deserves a debrief.</h2>
          <p>Open a case file in under a minute. No credit card, no waiting room.</p>
          <Link to="/Register" className="hp-btn-primary">Open To Brief Anaylsis</Link>
        </div>
      </section>
    </div>
  );
}