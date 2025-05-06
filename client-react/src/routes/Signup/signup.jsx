import React, { useState } from "react";
import "./signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.PNG";
import validateEmail from "../../utils/usefulFunctions.jsx";

function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    names: "",
    phone: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.nom);
    //validate the values entered first
    if(!user.names || !user.phone || !user.password || !user.email) {
      setError("Please fill in all the fields");
      return;
    }
    if(!validateEmail(user.email)) {
      setError("Please enter a valid email");
      return; 
    }
    if(password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      //create user using api
      const res = await axios.post(
        "http://localhost:5000/api/v1/clients/register",
        user
      );

      console.log(res.data);
      setError("Account created successfully");
      setUser({
        nom: "",
        prenom: "",
        phone: "",
        password: "",
        email: "",
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="left">
        <img src={logo} alt="Logo" className="signup-logo" />
      </div>
      <div className="right">
        <div className="signup-wrapper">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            {[
              {
                label: "Names",
                type: "text",
                name: "names",
                value: user.names,
              },
              {
                label: "Email",
                type: "email",
                name: "email",
                value: user.email,
              },
              {
                label: "Phone",
                type: "text",
                name: "phone",
                value: user.phone,
              },
              {
                label: "Password",
                type: "password",
                name: "password",
                value: user.password,
              },
            ].map(({ label, type, name, value }, index) => (
              <div className="form-row" key={index}>
                <label htmlFor={name}>{label}:</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="signup-input"
                />
              </div>
            ))}

            <button disabled={isLoading} className="signup-button">
              Signup
            </button>
            {error && <span className="error-message">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
