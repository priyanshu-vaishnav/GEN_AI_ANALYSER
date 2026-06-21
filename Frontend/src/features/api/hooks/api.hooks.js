import { useState, useContext } from "react"; // ✅ 1. useState yahan import kiya
import { AuthContext } from "../../auth/context/auth.context.jsx";
import { GenerateReport } from "../../api/services/service.api.js";
import { useNavigate } from "react-router-dom";

export const useApi = () => {
  const context = useContext(AuthContext);
  // ✅ 2. Context se report aur setReport dono nikaal liye taaki neeche return ho sakein
  const { report, setReport } = context; 

  // Local states jo sirf is hook tak seemit hain
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();

  const handleGenerateReport = async ({
    selfDescription,
    resumeFile,
    jobDescription,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await GenerateReport({
        selfDescription,
        resumeFile,
        jobDescription,
      });
      
      setReport(data); // Global context update kiya
      setSuccess("Report generated successfully!");
      
      // Kam se kam delay ke sath navigation, taaki success message user ko dikhe
      setTimeout(() => {
        navigate("/interviewReport"); 
      }, 800);

    } catch (err) {
      setError(err.message);
    } finally {
      // ✅ 3. setLoading(false) toh immediate chalega, par error/success 2 second baad clean honge
      setLoading(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  return {
    loading,
  setLoading,
    error,
    success,
    handleGenerateReport,
    report,    // Ab yeh bina crash kiye sahi return hoga
    setReport, // Ab yeh bhi perfect chalega
  };
};