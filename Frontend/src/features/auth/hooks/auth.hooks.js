import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Register, Login, GetMe, Logout } from "../../services/auth.api.js";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
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

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await Register({ username, email, password });
      setUser(data.user);
      setSuccess("Registration successful!");
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

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null); // Puraane errors ko clear karein bhot zaroori hai
    try {
      const data = await Login({ email, password });
      setUser(data.user); // API se jo user object aaya use set karein
      setSuccess("Registration successful!");
      navigate("/dashboard"); // Login ke baad dashboard pe le jao
    } catch (err) {
      // Ab aapko yahan backend waala "invalid credentials" message dikhega
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await Logout();
      setUser(null); // Logout ke baad user ko null kar dein
      setSuccess("Logout successful!");
      navigate("/login"); // Logout ke baad login page pe le jao
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

  const getMe = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await GetMe();
      setUser(data);
    
      setSuccess("Refresh successful!");
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
    handleLogin,
    handleRegister,
    error,
    success,
    getMe,
    handleLogout,
    
  };
};
