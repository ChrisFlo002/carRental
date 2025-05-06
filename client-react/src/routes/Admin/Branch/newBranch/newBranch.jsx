import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./newBranch.scss";
import axios from "axios";
import ImageUploader from "../../../../components/imageUploader/imageUploader.jsx";
import { AuthContext } from "../../../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const BranchAddForm = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    address: "",
    region: "",
    images: [],
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImagesChange = (images) => {
    setFormData({
      ...formData,
      images,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you would send the form data to your backend
      console.log("Submitting branch data:", formData);
      console.log(currentUser.token);
      // Example API call (commented out)
      const response = await axios.post("http://localhost:5000/api/v1/branches/", formData, {
        headers: { Authorization: `Bearer ${currentUser.token}`},
      });
      console.log("Branch added successfully:", response.data);

      // Reset form after successful submission
      alert("Branch added successfully!");

      setFormData({
        branchName: "",
        address: "",
        region: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding branch:", error);
      alert("Failed to add branch. Please try again.");
    }
  };

  const goBack = () => {
    // This would typically use router navigation
    console.log("Going back...");
    // e.g., history.goBack() or navigate(-1) with react-router
    navigate("/dash/branches");
  };

  return (
    <div className="branch-add-container">
      <header className="form-header">
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft />
        </button>
        <h1>Add New Branch</h1>
      </header>

      <form className="branch-add-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="branchName">Branch Name</label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Select region</option>
              <option value="Bujumbura">Bujumbura</option>
              <option value="Gitega">Gitega</option>
              <option value="Buhumuza">Buhumuza</option>
              <option value="Burunga">Burunga</option>
              <option value="Butanyerera">Butanyerera</option>
            </select>
          </div>
        </div>

        <div className="image-section">
          <h2>Branch Images</h2>
          <ImageUploader
            onImagesChange={handleImagesChange}
            initialImages={formData.images}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Branch
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchAddForm;
