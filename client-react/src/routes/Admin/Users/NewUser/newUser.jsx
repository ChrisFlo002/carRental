import React, { useContext, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "./newUser.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../context/authContext.jsx";

const AdminAddForm = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    names: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  //update role value
  const handleRoleChange = (data) => {
    setRole(data);
    console.log(role);
    console.log("Data: ",data);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    //console.log(`Element: ${name}, Type: ${type}, Value: ${value}`);

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.names.trim()) {
      newErrors.names = "Name is required";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number with country code";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    //validate role selection
    if (!role) {
      newErrors.role = "Role is required";
    }
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      setIsLoading(true);
      // Here you would send the form data to your backend
      // Omit confirmPassword as it's only for frontend validation
      const adminData = {
        names: formData.names,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        isActive: formData.isActive,
        role: role,
      };
      console.log("Admin role:", adminData.role);
      // Example API call (commented out)
      const response = await axios.post(
        "http://localhost:5000/api/v1/admins/register",
        adminData,
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log("User added successfully:", response.data);

      // Reset form after successful submission
      alert("Admin registered successfully!");

      setFormData({
        names: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        isActive: true,
      });
      setRole("");
      //navigate("/dash/users");
    } catch (error) {
      console.error("Error adding admin:", error);

      if (error.response && error.response.data) {
        // Handle server validation errors
        if (error.response.data.error === "Email already exists") {
          setErrors({
            ...errors,
            email: "This email is already registered",
          });
        } else {
          alert("Failed to register admin. Please try again.");
        }
      } else {
        alert("Failed to register user. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    // This would typically use router navigation
    navigate("/dash/users");
  };

  return (
    <div className="admin-add-container">
      <header className="form-header">
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft />
        </button>
        <h1>Register New User</h1>
      </header>

      <form className="admin-add-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="names">Full Name</label>
            <input
              type="text"
              id="names"
              name="names"
              value={formData.names}
              onChange={handleChange}
              className={errors.names ? "error" : ""}
            />
            {errors.names && <span className="error-text">{errors.names}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group ">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group ">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className={errors.role ? "error" : ""}
            >
              <option value="">Select user role</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="driver">Driver</option>
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="active-status">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            <span className="label-text">Active Account</span>
          </label>
        </div>

        <div className="security-notice">
          <p>
            Password must be at least 8 characters long and should include
            numbers, letters, and special characters for better security.
          </p>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isLoading ? "Loading..." : "Register User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddForm;
