import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hooks.js";
import { useApi } from "../../api/hooks/api.hooks.js";
import StatusScreen from "../components/StatusScreen.jsx";
import "./auth.dashboard.css";
import { GetUserReports } from "../../services/auth.api.js";

export default function Dashboard() {
  // Auth states aur functions
  const {
    handleLogout,
    user,
    error,
    success,
    loading,
    setLoading,
    report,
    setReport,
  } = useAuth();

  // API states aur functions
  const { handleGenerateReport } = useApi();

  // Local Form States
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("");

  // Fix 1: Variable name lowercase 'navigate' kiya
  const navigate = useNavigate();

  // Resume Upload Handler
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setFileName(file.name);
    }
  }

  // All Reports page par jaane ke liye
  function goto() {
    navigate("/interviewreport");
  }

  // Kisi specific report ko open karne ke liye
  function openReport(clickedId) {
    
  

    const userReports = report.reports.filter((r) => r._id === clickedId);
    setReport(userReports);

    
    navigate("/interviewreport");
  }

  // Nayi Report generate karne ke liye
  async function handleGenerate() {
    if (!selfDescription || !jobDescription || !resume) {
      alert("Please fill all fields and upload your resume.");
      return;
    }

    try {
      setLoading(true);
      const newReport = await handleGenerateReport({
        selfDescription,
        resumeFile: resume,
        jobDescription,
      });

      // Agar instant redirect karna chahein naye report par:
      if (newReport) {
        navigate("/interviewreport", { state: { selectedReport: newReport } });
      }
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const data = await GetUserReports();
      setReport(data);
   
    };

    fetchUser();
  }, []);

  return (
    <div className="page">
      <div className="card1">
        {/* Status Messages (Loading/Error/Success) */}
        <StatusScreen loading={loading} error={error} success={success} />

        {/* Logo Header */}
        <div className="logo-row">
          <div className="logo-icon">
            <i className="ti ti-file-text"></i>
          </div>
          <div>
            <div className="logo-text">Interview Prep</div>
            <div className="logo-sub">AI-powered report generator</div>
          </div>
        </div>

        {/* Welcome Section */}
        <p className="welcome">
          Welcome back, <span>{user?.name || "Priyanshu"}</span> 👋
        </p>

        {/* Self Introduction Field */}
        <div className="field">
          <label>Self Introduction</label>
          <textarea
            placeholder="Tell us about yourself — your background, skills, and goals..."
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
          />
        </div>

        {/* Resume Upload Field */}
        <div className="field">
          <label>Resume</label>
          <div
            className="upload-box"
            onClick={() => document.getElementById("resumeFile").click()}
          >
            <i className="ti ti-upload"></i>
            <p>Click to upload your resume</p>
            <span>PDF, DOC, DOCX — max 5MB</span>
            <input
              type="file"
              id="resumeFile"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }} // Visually native button hide kiya
              onChange={handleFileChange}
            />
            {fileName && <div className="file-name">{fileName}</div>}
          </div>
        </div>

        {/* Job Description Field */}
        <div className="field">
          <label>Job Description</label>
          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="btn-row">
          <button className="btn-logout" onClick={handleLogout}>
            <i className="ti ti-logout"></i> Logout
          </button>
          <button className="btn-generate" onClick={handleGenerate}>
            <i className="ti ti-sparkles"></i> Generate Report
          </button>
        </div>

     
        <div className="reports-list" style={{ marginTop: "15px" }}>
          {report.reports ? (
            report.reports.map((r, i) => (
              <button
                key={r._id || i}
                onClick={() => openReport(r._id)} // Direct ID pass kar di parameter me
                style={{
                  padding: "10px",
                  margin: "5px",
                  display: "block",
                  width: "100%",
                }}
              >
                <div>Report {i + 1}</div>
              </button>
            ))
          ) : (
          <>
            <div>Not found</div>
            
            </>

          )}
        </div>
      </div>
    </div>
  );
}
