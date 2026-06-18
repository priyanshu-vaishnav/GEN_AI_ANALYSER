import React, { useState } from 'react';
import { useEffect } from 'react';
import { useApi } from "../hooks/api.hooks.js";
import "./Interviewreport.css"; // CSS File Import ki hai yahan

export default function InterviewReport() {
  const { error, user, report, loading, success,setLoading } = useApi();
  const [completedDays, setCompletedDays] = useState({});
  const [activeTechQuestion, setActiveTechQuestion] = useState(null);
  const [activeBehavQuestion, setActiveBehavQuestion] = useState(null);


  if (loading) {
    return (
      <div className="center-screen">
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#475569', fontWeight: '500' }}>Generating your customized dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center-screen" style={{ padding: '16px' }}>
        <div className="error-box">
          <p style={{ fontWeight: '700', margin: 0 }}>⚠️ Error Occurred</p>
          <p style={{ fontSize: '14px', marginTop: '4px', margin: 0 }}>{error?.message || "Failed to load data. Please try again."}</p>
        </div>
      </div>
    );
  }

  const reportData = report?.report  ||report[0] ||report;
 

  const { 
    matchScore = 0, 
    technicalQuestions = [], 
    behaviourQuestions = [], 
    skillsGap = [], 
    dailyPreparePlans = [] 
  } = reportData || {};

  if (!report || !reportData || Object.keys(reportData).length === 0) {
    return (
      <div className="center-screen">
        <p style={{ color: '#64748b', fontWeight: '500' }}>No report data available at the moment.</p>
      </div>
    );
  }

  const toggleDay = (index) => {
    setCompletedDays(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getScoreClass = (score) => {
    if (score >= 85) return 'score-high';
    if (score >= 70) return 'score-med';
    return 'score-low';
  };

  return (
    <div className="dashboard-container">
      
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Interview Preparation Dashboard</h1>
          {user && <p>Welcome back, {user.username || 'User'}!</p>}
          <span className="subtitle">Dynamic analysis based on your profile and target job.</span>
        </div>
        <div className={`score-badge ${getScoreClass(matchScore)}`}>
          <span className="score-num">{matchScore}%</span>
          <span className="score-label">Match Score</span>
        </div>
      </header>

      <div className="dashboard-grid">
        
        {/* Left Column: Questions & Gaps */}
        <div className="left-column">
          
          {/* Technical Questions */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <span className="icon-wrapper bg-blue">💻</span>
              Technical Questions ({technicalQuestions.length})
            </h2>
            {technicalQuestions.length === 0 ? (
              <p className="italic-empty">No technical questions available.</p>
            ) : (
              <div className="questions-list">
                {technicalQuestions.map((q, idx) => {
                  const isOpen = activeTechQuestion === idx;
                  const hasAnswer = q.answer || q.intention;

                  return (
                    <div key={idx} className="accordion-item">
                      <div 
                        onClick={() => hasAnswer && setActiveTechQuestion(isOpen ? null : idx)}
                        className="accordion-header"
                      >
                        <span className="question-text">
                          <strong style={{ color: '#2563eb', marginRight: '4px' }}>Q{idx + 1}.</strong> {q.question}
                        </span>
                        {hasAnswer && <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▼</span>}
                      </div>
                      
                      {isOpen && hasAnswer && (
                        <div className="accordion-body">
                          {q.intention && (
                            <div className="meta-block">
                              <span className="meta-label label-purple">Interviewer Intent:</span>
                              <p className="meta-desc" style={{ fontStyle: 'italic' }}>{q.intention}</p>
                            </div>
                          )}
                          {q.answer && (
                            <div className="meta-block">
                              <span className="meta-label label-green">Suggested Answer Guide:</span>
                              <p className="meta-desc whitespace-pre">{q.answer}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Behavioural Questions */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <span className="icon-wrapper bg-purple">🤝</span>
              Behavioural Questions ({behaviourQuestions.length})
            </h2>
            {behaviourQuestions.length === 0 ? (
              <p className="italic-empty">No behavioural questions available.</p>
            ) : (
              <div className="questions-list">
                {behaviourQuestions.map((q, idx) => {
                  const isOpen = activeBehavQuestion === idx;
                  const hasAnswer = q.answer || q.intention;

                  return (
                    <div key={idx} className="accordion-item">
                      <div 
                        onClick={() => hasAnswer && setActiveBehavQuestion(isOpen ? null : idx)}
                        className="accordion-header"
                      >
                        <span className="question-text">
                          <strong style={{ color: '#9333ea', marginRight: '4px' }}>Q{idx + 1}.</strong> {q.question}
                        </span>
                        {hasAnswer && <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▼</span>}
                      </div>
                      
                      {isOpen && hasAnswer && (
                        <div className="accordion-body">
                          {q.intention && (
                            <div className="meta-block">
                              <span className="meta-label label-purple">Interviewer Intent:</span>
                              <p className="meta-desc" style={{ fontStyle: 'italic' }}>{q.intention}</p>
                            </div>
                          )}
                          {q.answer && (
                            <div className="meta-block">
                              <span className="meta-label label-green">STAR Approach Answer:</span>
                              <p className="meta-desc whitespace-pre">{q.answer}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Skills Gap */}
          <section className="dashboard-section">
            <h2 className="section-title">
              <span className="icon-wrapper bg-orange">🎯</span>
              Skills Gap & Focus Areas
            </h2>
            {skillsGap.length === 0 ? (
              <p className="italic-empty">No skills gap identified.</p>
            ) : (
              <div className="skills-list">
                {skillsGap.map((gap, idx) => (
                  <div key={idx} className="skill-card">
                    <div className="skill-info">
                      <h4>{gap.skill}</h4>
                      <p>Prerequisite Focus Area</p>
                    </div>
                    <span className={`intensity-badge int-${gap.intensity}`}>
                      {gap.intensity} Priority
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Sticky Preparation Plan */}
        <div className="sticky-sidebar">
          <section className="dashboard-section">
            <h2 className="section-title" style={{ marginBottom: '2px' }}>
              <span className="icon-wrapper bg-green">📅</span>
              Preparation Plan
            </h2>
            <p className="plan-subtitle">Track your dynamic daily progress</p>
            
            {dailyPreparePlans.length === 0 ? (
              <p className="italic-empty">No preparation plan generated.</p>
            ) : (
              <div className="plan-list">
                {dailyPreparePlans.map((plan, idx) => {
                  const isDone = !!completedDays[idx];

                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleDay(idx)}
                      className={`plan-card ${isDone ? 'completed' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isDone}
                        onChange={() => {}} 
                        className="plan-checkbox"
                      />
                      <div className="plan-content">
                        <span className="day-tag">{plan.day}</span>
                        <h4 className="focus-title">{plan.focus}</h4>
                        
                        {plan.tasks && plan.tasks.length > 0 && !isDone && (
                          <ul className="tasks-list">
                            {plan.tasks.map((task, tIdx) => (
                              <li key={tIdx}>{task}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}