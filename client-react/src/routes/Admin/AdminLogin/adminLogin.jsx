import React, { useState, useEffect, useContext } from "react";
import "./adminLogin.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/logo1.PNG";
import validateEmail from "../../../utils/usefulFunctions.jsx";
import { AuthContext } from "../../../context/authContext.jsx";

function AdminLogin() {
  //states to take the values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const navigate = useNavigate();
  const {updateUser, logout} = useContext(AuthContext);

  //max attempts allowed
  const maxAttempts = 1;
  //lock time in seconds
  const LOCK_DURATION = 60;
  //function to lock the user
  useEffect(() => {
    let timer;
    if (isLocked && lockTime > 0) {
      timer = setTimeout(() => {
        setLockTime(lockTime - 1);
      }, 1000);
      setError(`Too many attempts. Try again in ${lockTime} seconds.`);
    } else if (isLocked && lockTime <= 0) {
      setIsLocked(false);
      setAttempts(0);
      setError("");
    }
    return () => clearTimeout(timer);
  }, [lockTime, isLocked]);
  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      return;
    }
    setError("");
    
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    logout();
    const user = {
      email: inputs.email,
      password: inputs.password,
    };
    
    //validate email and password first
    if (!user.email || !user.password) {
      setError("Please enter email and password");
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/admins/login",
        user
      );
      // Handle successful login, store token, etc.
      // Store user data in local storage
      updateUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      console.log(res.data);
      //navigating selon role
      if (res.data.profil === "admin") {
        navigate("/dash");
      }
    } catch (err) {
      let remaining = maxAttempts - attempts;
      setError(`Login failed! ${remaining} attempts left`);
      console.log(err);
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
      setAttempts(attempts + 1);
      //lock the user if max attempts are reached
      if (attempts >= maxAttempts) {
        setIsLocked(true);
        setLockTime(LOCK_DURATION);
      }
    }
  };

  return (
    <div className="page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="formgroup">
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="username"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in ...":"Login"}
          </button>
          {error && <span className="error-message">{error}</span> /*RETURNING THE ERROR IF ANY*/}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
