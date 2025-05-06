import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaLink } from 'react-icons/fa';
import './ImageUploader.scss';

const ImageUploader = ({ onImagesChange, initialImages = [] }) => {
  const [imageUrls, setImageUrls] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const uploadedUrls = await uploadImages(files, (progress) => {
        setUploadProgress(progress);
      });
      
      const newUrls = [...imageUrls, ...uploadedUrls];
      setImageUrls(newUrls);
      onImagesChange(newUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload one or more images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImages = async (files, progressCallback) => {
    // Simulate image upload to a server
    // In a real implementation, you would replace this with actual API calls
    const uploadedUrls = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Simulate upload progress
      await new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          progressCallback(progress);
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 200);
      });
      
      // Mock URL for demonstration
      const mockUrl = `https://example.com/image-${Date.now()}-${i}.jpg`;
      uploadedUrls.push(mockUrl);
      
      // Reset progress for next file
      progressCallback(0);
    }
    
    return uploadedUrls;
  };

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      const newUrls = [...imageUrls, urlInput];
      setImageUrls(newUrls);
      onImagesChange(newUrls);
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const removeImage = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    onImagesChange(newUrls);
  };

  return (
    <div className="image-uploader">
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
          style={{ display: 'none' }}
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
          <button type="button" onClick={handleUrlAdd}>Add</button>
        </div>
      )}
      
      <div className="image-preview-container">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="image-preview">
              <img src="/api/placeholder/120/80" alt={`Preview ${index + 1}`} />
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
  );
};

export default ImageUploader;