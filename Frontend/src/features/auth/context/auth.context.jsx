import { createContext, useState } from "react";
import { GetMe } from "../../services/auth.api.js";
import { useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [report, setReport] = useState(null);

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
