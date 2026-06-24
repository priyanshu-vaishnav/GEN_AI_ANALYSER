import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth.hooks";
import StatusScreen from "../components/StatusScreen.jsx";

import "./auth.forms.css";

function Register() {
  const { user, loading, error, handleRegister, success,setUser,setSuccess,setError } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password });
   
  };



  return (
    
    <div className="form-box">
        <StatusScreen loading={loading} error={error} success={success} />
      <h2>Register</h2>
      <p>Welcome</p>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
     
    </div>

  );
}

export default Register;
