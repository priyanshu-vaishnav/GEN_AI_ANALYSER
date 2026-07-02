import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks";
import "./auth.forms.css";
import { useState } from "react";
import StatusScreen from "../components/StatusScreen.jsx";
import ForgetPassword from "../components/ForgetPassword.jsx";
import axios from "axios"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBlocked, setIsBlocked] = useState(true)
  const [logoutError, setLogoutError] = useState(null)


  const { user, loading, handleLogin, error, success, setError, setSuccess } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };


  const openModal = () => {
    console.log('press');

    setIsBlocked(false)

  }

  const changePassword = async (password, confirmPassword) => {

    if (password.toString() !== confirmPassword.toString()) {
      setError("password is not matched !!")

      setTimeout(() => {
        setError("")
      }, 2000);
      return;
    }
    try {
      if (password.toString() !== confirmPassword.toString()) {

        setError("password is not matched !!")
        return;
      }
      const response = await axios.put("http://localhost:3000/api/auth/forgetpassword", { email, password })
      setSuccess(response.data.message)
    } catch (err) {
      setError(err.response.data.message)
    }
    finally {
      setTimeout(() => {
        setError("")
        setSuccess("")
        setIsBlocked(true)
      }, 2000);
    }
  }


  return (
    <>
      <div className="form-box">
        <StatusScreen loading={loading} error={error} success={success} />
        <h3>Login</h3>
        {isBlocked ? <form>
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
          <div style={{ marginTop: '10px' }}>
            <button onClick={openModal} className="btn btn-danger m-0 p-0" style={{ backgroundColor: "#16181d", border: "none", }}>forget my password?</button>
          </div>

        </form> :
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
              />
            </div>

            <button onClick={() => changePassword(password, confirmPassword)}>submit</button>
          </div>
        }

        <p>
          Haven't an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
