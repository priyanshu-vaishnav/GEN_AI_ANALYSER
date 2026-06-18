import React, { useState } from "react";
import { useAuth } from "../hooks/auth.hooks.js";
import{useEffect} from "react"

import { useNavigate ,Link, Navigate} from "react-router-dom";
import StatusScreen from "../components/StatusScreen.jsx";
import { useApi } from "../../api/hooks/api.hooks.js";



import "./auth.dashboard.css";

export default function Dashboard() {
    const { handleLogout,user,error,success,loading,setLoading} = useAuth();
    const {report,setReport} = useApi();
    const {handleGenerateReport} = useApi();
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [fileName, setFileName] = useState(""); 
    const Navigate= useNavigate();

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
            setFileName(file.name);
        }
    }
    function goto(){
       
        Navigate("/interviewreport")
    }

    function openReport(e){
        const clickedId =e.target.innerText;
    

      const foundReport = report[0].find(item => item._id === clickedId);
        setReport(foundReport)
        
        Navigate("/interviewreport")
    }
    async function handleGenerate() {
        if (!selfDescription || !jobDescription || !resume) {
            alert("Please fill all fields and upload your resume.");
            return;
        }
        const report = await handleGenerateReport({ selfDescription, resumeFile: resume, jobDescription });
      
    }

    useEffect(() => {
        console.log(report);
        // Jab component mount ho to GetMe call karo taaki pata chale ki user already logged in hai ya nahi
        const fetchUser = async () => {
          setLoading(true);
          try {
            const data = await GetMe();
            setUser(data); // Agar user logged in hai to uska data set karo
            setReport(data.reports);
          } catch (err) {
            setUser(null); // Agar error aaya to user ko null set karo (not authenticated)
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, []); // Empty dependency array ka matlab ye effect sirf ek baar chalega jab component mount ho



    
    
    return (
        <div className="page">
            <div className="card1">
            <StatusScreen loading={loading} error={error} success={success} />

                <div className="logo-row">
                    <div className="logo-icon">
                        <i className="ti ti-file-text"></i>
                    </div>
                    <div>
                        <div className="logo-text">Interview Prep</div>
                        <div className="logo-sub">AI-powered report generator</div>
                    </div>
                </div>

                <p className="welcome">
                    Welcome back, <span>Priyanshu</span> 👋
                </p>

                <div className="field">
                    <label>Self Introduction</label>
                    <textarea
                        placeholder="Tell us about yourself — your background, skills, and goals..."
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Resume</label>
                    <div className="upload-box" onClick={() => document.getElementById("resumeFile").click()}>
                        <i className="ti ti-upload"></i>
                        <p>Click to upload your resume</p>
                        <span>PDF, DOC, DOCX — max 5MB</span>
                        <input
                            type="file"
                            id="resumeFile"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        {fileName && <div className="file-name">{fileName}</div>}
                    </div>
                </div>

                <div className="field">
                    <label>Job Description</label>
                    <textarea
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                <div className="btn-row">
                    <button className="btn-logout" onClick={handleLogout}>
                        <i className="ti ti-logout"></i> Logout
                    </button>
                    <button className="btn-generate" onClick={handleGenerate}>
                        <i className="ti ti-sparkles"></i> Generate Report
                    </button>
                </div>

        <button onClick={goto}>Report</button>

      {
    // Pehle check karein ki report[0] exist karta hai aur woh array hai
    report && report[0] && report[0].map((r, i) => (
        <button key={i} onClick={(e) => openReport(e)} style={{ padding: '10px' }}>
            {/* r ab seedhe ek object hai, toh r._id use karein */}
            <div>{r._id}</div>
        </button>
    ))
}
            </div>
        </div>
    );
}