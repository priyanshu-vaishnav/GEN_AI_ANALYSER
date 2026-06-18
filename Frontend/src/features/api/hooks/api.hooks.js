import { useContext } from "react";
import { AuthContext } from "../../auth/context/auth.context.jsx";

import { GenerateReport } from "../../api/services/service.api.js";
import { useNavigate } from "react-router-dom";

export const useApi = () => {
  const context = useContext(AuthContext);
  const {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    report,
    setReport,
  } = context;
  const navigate = useNavigate();

  const handleGenerateReport = async ({ selfDescription,    resumeFile,
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
      setReport(data); // ← pehle report set karo (object as-is, stringify mat karo)
      setSuccess("Report generated successfully!");
      setTimeout(() => {
        navigate("/interviewReport"); // ← thodi der baad navigate karo
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  return {
    user,
    loading,
    error,
    success,
    handleGenerateReport,
    report,
    setReport,
  };
};
