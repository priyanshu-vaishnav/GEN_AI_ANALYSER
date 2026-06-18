import { createContext, useState } from "react";
import { GetMe } from "../../services/auth.api.js";
import { useEffect } from "react";
import { GetUserReports } from "../../services/auth.api.js";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [report, setReport] = useState(null);
  

  useEffect(() => {
   
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await GetMe();
        const reportData = await GetUserReports();

        setUser(data); 
        
        setReport(reportData)
      } catch (err) {
        setUser(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
