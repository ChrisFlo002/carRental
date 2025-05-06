import React from 'react';
import './dialogbox.scss';

const CustomDialog = ({ icon, message, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <button className="dialog-close" onClick={onClose}>×</button>
        <div className="dialog-icon">{icon}</div>
        <div className="dialog-message">{message}</div>
        <button className="dialog-button" onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default CustomDialog;
