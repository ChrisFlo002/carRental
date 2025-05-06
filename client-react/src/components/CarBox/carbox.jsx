// CarBox.jsx
import React, { useContext, useState } from "react";
import "./carbox.scss";
import { useNavigate } from "react-router-dom";

const CarBox = ({ car, profile }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const handleViewDetails = () => {
    // Pass the `car` object via state
    //navigate("/details", { state: { car } });
 if(profile){
      navigate(`/dash/detailsAdmin/${car._id}`);
    }else{
      navigate(`/details/${car._id}`);
    }
    
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="car-box">
      <div
        className={`car-image-container ${isHovering ? "hovering" : ""}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={car.images[currentImageIndex]}
          alt={car.plate}
          className="car-image"
        />
        <div className="image-navigation">
          {car.images.map((_, index) => (
            <div
              key={index}
              className={`image-dot ${
                currentImageIndex === index ? "active" : ""
              }`}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
      </div>
      <div className="car-name">{car.brand} : {car.plate}</div>
      <div className="car-features">
        <div className="feature">
          <i className="feature-icon range-icon"></i>
          <span>{car.mileage} Km</span>
        </div>
        <div className="feature">
          <i className="feature-icon fuel-icon"></i>
          <span>{car.fuelEfficiency} Liters</span>
        </div>
        <div className="feature">
          <i className="feature-icon transmission-icon"></i>
          <span>{car.horsepower} HP</span>
        </div>
      </div>

      <div className="car-price-section">
        <div className="price">${car.price.toLocaleString()}</div>
        <a onClick={() => handleViewDetails()} className="view-details">
          View Details <i className="arrow-icon"></i>
        </a>
      </div>
    </div>
  );
};

export default CarBox;
