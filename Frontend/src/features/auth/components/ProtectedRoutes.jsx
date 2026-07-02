import React, { useEffect } from "react";
import { useAuth } from "../hooks/auth.hooks.js";
import StatusScreen from "../components/StatusScreen.jsx";
import { useNavigate } from "react-router";

export default function ProtectedRoutes({ children }) {
  const { user, loading, getMe } = useAuth();

  const navigate = useNavigate();

  // Wait until loading finishes before evaluating auth status
  if (loading) {
    return <StatusScreen loading={loading} error={null} />;
  }

  if (!user) {
    navigate("/login"); // Agar user authenticated nahi hai to login page pe le jao
    return <StatusScreen loading={false} error={"Unauthorized Access"} />;
  }

  return <div>{children}</div>;
}
