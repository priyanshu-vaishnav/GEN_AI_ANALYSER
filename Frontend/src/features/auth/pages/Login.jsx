import React from "react";
import { Link ,useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks";
import "./auth.forms.css";
import { useState } from "react";
import StatusScreen from "../components/StatusScreen.jsx";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, handleLogin, error, success } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };



  return (
    <>
      <div className="form-box">
        <StatusScreen loading={loading} error={error} success={success} />
        <h3>Login</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p>
          Already have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
