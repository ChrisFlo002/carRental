import React, { useState, useRef, useContext, useEffect } from "react";
import "./addCar.scss";
import { FaArrowLeft, FaCloudUploadAlt, FaLink } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";

const AddCar = () => {
  const [formData, setFormData] = useState({
    plate: "",
    brand: "",
    towing: "",
    fuelEfficiency: "",
    mileage: "",
    horsepower: "",
    comfort: "",
    year: "",
    price: "",
    branch: "",
    status: "Available",
    fuelType: "EV",
    transmission: "Automatic",
    images: [],
    vin: ""
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // Fetch branches from the backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/branches/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        setBranches(response.data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // For each file, we would upload to a free image hosting service
    // Here's a simulation with setTimeout to show progress
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      try {
        // In a real implementation, you would use axios to upload to an actual service
        // This is just a simulation
        await new Promise((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
              resolve();
            }
          }, 200);
        });

        // Mock URL for demonstration
        const mockUrl = `https://example.com/car-image-${Date.now()}-${i}.jpg`;
        uploadedUrls.push(mockUrl);

        // Reset progress for next file
        setUploadProgress(0);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setIsUploading(false);

    // Add new URLs to state
    const newUrls = [...imageUrls, ...uploadedUrls];
    setImageUrls(newUrls);

    // Update form data with new image URLs
    setFormData({
      ...formData,
      images: newUrls,
    });
  };
  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      const newUrls = [...imageUrls, urlInput];
      setImageUrls(newUrls);
      setFormData({
        ...formData,
        images: newUrls,
      });
      setUrlInput("");
      setShowUrlInput(false);
    }
  };
  const removeImage = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setFormData({
      ...formData,
      images: newUrls,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you would send the form data to your backend
      console.log("Submitting form data:", formData);

      // Example API call (commented out)
      const response = await axios.post(
        "http://localhost:5000/api/v1/cars/",
        formData,
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log("Car added successfully:", response.data);

      // Reset form after successful submission
      alert("Car added successfully!");

      setFormData({
        plate: "",
        brand: "",
        towing: "",
        fuelEfficiency: "",
        mileage: "",
        horsepower: "",
        comfort: "",
        year: "",
        price: "",
        branch: "",
        status: "Available",
        images: [],
        transmission:"Automatic",
        fuelType: "EV",
        vin: ""
      });
      setImageUrls([]);
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please try again.");
    }
  };
  const goBack = () => {
    // This would typically use router navigation
    // For now, just log it
    navigate("/dash/cars");
  };
  return (
    <div className="car-add-container">
      <header className="form-header">
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft />
        </button>
        <h1>Add New Car</h1>
      </header>

      <form className="car-add-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="plate">License Plate</label>
            <input
              type="text"
              id="plate"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vin">Chassis number(VIN)</label>
            <input
              type="text"
              id="vin"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="towing">Towing Capacity (kg)</label>
            <input
              type="number"
              id="towing"
              name="towing"
              value={formData.towing}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fuelEfficiency">Fuel Efficiency (mpg/Kwh)</label>
            <input
              type="number"
              id="fuelEfficiency"
              name="fuelEfficiency"
              value={formData.fuelEfficiency}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mileage">Range(Km)</label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="horsepower">Horsepower</label>
            <input
              type="number"
              id="horsepower"
              name="horsepower"
              value={formData.horsepower}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comfort">Comfort Level</label>
            <select
              id="comfort"
              name="comfort"
              value={formData.comfort}
              onChange={handleChange}
              required
            >
              <option value="">Select comfort level</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Luxury">Luxury</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($/day)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select branch</option>
              {
                //loop from the branches inside the db
                branches.map((branch) => {
                  return (
                    <option key={branch._id} value={branch._id}>
                      {branch.branchName}
                    </option>
                  );
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transmission">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuelType">Fuel type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
            >
              <option value="EV">Ev</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Gasoline">Gasoline</option>
            </select>
          </div>
        </div>

        <div className="image-upload-section">
          <h2>Car Images</h2>

          <div className="upload-options">
            <button
              type="button"
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              <FaCloudUploadAlt />
              Upload Images
            </button>

            <button
              type="button"
              className="url-button"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <FaLink />
              Add Image URL
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </div>

          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span>{uploadProgress}% Uploading...</span>
            </div>
          )}

          {showUrlInput && (
            <div className="url-input-container">
              <input
                type="url"
                placeholder="Enter image URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button type="button" onClick={handleUrlAdd}>
                Add
              </button>
            </div>
          )}

          <div className="image-preview-container">
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <div key={index} className="image-preview">
                  <img
                    src="/api/placeholder/120/80"
                    alt={`Car preview ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <div className="no-images">No images added yet</div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
