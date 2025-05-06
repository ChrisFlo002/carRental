import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detailsAdmin.scss";
import { FaCheckCircle } from "react-icons/fa";
import CustomDialog from "../../../../components/DialogBox/dialogbox";
import axios from "axios";
import { AuthContext } from "../../../../context/authContext";

const DetailsPageAdmin = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [car, setCar] = useState();
  const [maintenances, setMaintenances] = useState([]);

  // Maintenance form state
  const [maintenanceDate, setMaintenanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [maintenanceDescription, setMaintenanceDescription] = useState("");
  const [maintenanceEndDate, setMaintenanceEndDate] = useState("");

  // Get current user from localStorage (assuming it's stored there)
  const { currentUser } = useContext(AuthContext);

  // Fetch car and maintenance info
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch car details
        const carResponse = await axios.get(
          `http://localhost:5000/api/v1/cars/${carId}`,
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        setCar(carResponse.data.data);
        console.log("Car: ", carResponse.data.data);
        // Fetch car maintenances
        const maintenanceResponse = await axios.get(
          `http://localhost:5000/api/v1/maintenance/car/${carId}`,
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        console.log("Maintenances: ", maintenanceResponse.data.data);
        setMaintenances(maintenanceResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching car information");
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate("/dash/cars");
  };

  const goToNextImage = () => {
    if (!car || !car.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    if (!car || !car.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddMaintenance = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const maintenanceData = {
        date: maintenanceDate,
        description: maintenanceDescription,
        endDate: maintenanceEndDate || undefined,
        car: carId,
        isDone: false,
      };

      await axios.post(
        "http://localhost:5000/api/v1/maintenance/",
        maintenanceData,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      // Refresh maintenance list
      const maintenanceResponse = await axios.get(
        `http://localhost:5000/api/v1/maintenance/car/${carId}`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      setMaintenances(maintenanceResponse.data.data);
      setMaintenanceDescription("");
      setMaintenanceEndDate("");
      setShowDialog(true);
    } catch (error) {
      console.error("Error adding maintenance:", error);
      alert("Error adding maintenance");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  // Show loading state if car data isn't loaded yet
  if (!car) {
    return (
      <div className="car-detail-container">
        <div className="loading-spinner">Loading car details...</div>
      </div>
    );
  }
  //update status
  const handleStatusToggle = async (maintenanceID, maintenance) => {
    try {
      maintenance.isDone = !maintenance.isDone;
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/maintenance/${maintenanceID}`,
        maintenance,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
      console.log(response.data.data);
      const maintenanceResponse = await axios.get(
        `http://localhost:5000/api/v1/maintenance/car/${carId}`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
      setMaintenances(maintenanceResponse.data.data);
    } catch (error) {
      alert("Error updating status");
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="car-detail-container">
      <div className="car-detail-header">
        <button className="back-button" onClick={handleGoBack}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>{!car ? "Loading..." : car.plate}</h1>
      </div>

      <div className="car-detail-content">
        <div className="car-info-grid">
          {/* Car Images Section */}
          <div className="car-image-section">
            <div className="carousel">
              <button className="carousel-button prev" onClick={goToPrevImage}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="carousel-container">
                {!car
                  ? "Loading..."
                  : car.images &&
                    car.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${car.make} ${car.model} - View ${index + 1}`}
                        className={`carousel-image ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      />
                    ))}
              </div>

              <button className="carousel-button next" onClick={goToNextImage}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="carousel-indicators">
                {!car
                  ? "Loading..."
                  : car.images &&
                    car.images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => goToImage(index)}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
              </div>
            </div>
          </div>

          {/* Car Info Section */}
          <div className="car-info-details">
            <div className="car-price-container">
              <div className="price-label">Daily Rate</div>
              <div className="price-value">
                ${!car ? "Loading..." : car.price}
                <span>/day</span>
              </div>
            </div>

            <div className="car-branch">
              <div className="branch-label">Branch</div>
              <div className="branch-name">
                {!car ? "Loading..." : car.branch.branchName}
              </div>
            </div>

            {/* Overview Panel */}
            <div className="car-specs">
              <h3>Car Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Brand</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.brand}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Chassis Number</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.vin}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Range</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.mileage} Km
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Type</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.fuelType}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Year</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.year}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.transmission}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Engine HP</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.horsepower} HP
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Capacity</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.capacity}{" "}
                    {!car
                      ? "Loading..."
                      : car.fuelType === "Electric"
                      ? "kWh"
                      : "L"}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Status</span>
                  <span className="spec-value">
                    {!car ? "Loading..." : car.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Maintenance Form */}
        <div className="maintenance-section">
          <div className="maintenance-form-container">
            <h2>Add New Maintenance</h2>
            <form onSubmit={handleAddMaintenance} className="maintenance-form">
              <div className="form-group">
                <label htmlFor="maintenanceDate">Maintenance Date</label>
                <input
                  type="date"
                  id="maintenanceDate"
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="maintenanceDescription">Description</label>
                <textarea
                  id="maintenanceDescription"
                  value={maintenanceDescription}
                  onChange={(e) => setMaintenanceDescription(e.target.value)}
                  placeholder="Describe the maintenance needs"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="maintenanceEndDate">
                  Expected End Date (Optional)
                </label>
                <input
                  type="date"
                  id="maintenanceEndDate"
                  value={maintenanceEndDate}
                  onChange={(e) => setMaintenanceEndDate(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading || (car && car.status !== "Available")}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : car && car.status === "Available" ? (
                  "Add Maintenance"
                ) : (
                  "Canot Add Maintenance"
                )}
              </button>
            </form>
          </div>

          {/* Maintenance History Table */}
          <div className="maintenance-history">
            <h2>Maintenance History</h2>
            {maintenances.length === 0 ? (
              <p className="no-records">
                No maintenance records found for this vehicle.
              </p>
            ) : (
              <div className="table-container">
                <table className="maintenance-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Expected End Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenances.map((maintenance) => (
                      <tr key={maintenance.maintenanceId}>
                        <td>{maintenance.maintenanceId}</td>
                        <td>{formatDate(maintenance.date)}</td>
                        <td>{maintenance.description}</td>
                        <td>
                          {maintenance.endDate
                            ? formatDate(maintenance.endDate)
                            : "Not specified"}
                        </td>
                        <td
                          className={`status ${
                            maintenance.isDone ? "completed" : "pending"
                          }`}
                        >
                          {maintenance.isDone ? "Completed" : "Pending"}
                        </td>
                        <td className="action-cell">
                          <button
                            className={`status-toggle-button ${
                              maintenance.isDone ? "reopen" : "complete"
                            }`}
                            onClick={() =>
                              handleStatusToggle(maintenance._id, maintenance)
                            }
                          >
                            {maintenance.isDone
                              ? "Mark as Pending"
                              : "Mark as Completed"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDialog && (
        <CustomDialog
          icon={<FaCheckCircle />}
          message="Maintenance record added successfully!"
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default DetailsPageAdmin;
