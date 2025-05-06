// imageUploadService.js

/**
 * Upload multiple images to a server
 * @param {File[]} files - Array of File objects to upload
 * @param {Function} progressCallback - Callback function that receives upload progress (0-100)
 * @returns {Promise<string[]>} Promise resolving to array of image URLs
 */
export const uploadImages = async (files, progressCallback = () => {}) => {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = await uploadSingleImage(file, progressCallback);
    uploadedUrls.push(url);
  }

  return uploadedUrls;
};

/**
 * Upload a single image to a server
 * @param {File} file - File object to upload
 * @param {Function} progressCallback - Callback function that receives upload progress (0-100)
 * @returns {Promise<string>} Promise resolving to image URL
 */
export const uploadSingleImage = async (file, progressCallback = () => {}) => {
  // Create a FormData object
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Example implementation using a free image hosting service
    // Replace with your preferred service (Cloudinary, Firebase, etc.)
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=YOUR_API_KEY",
      {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          progressCallback(percentCompleted);
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.url; // This structure depends on the API you're using
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

/**
 * Validates an image file type and size
 * @param {File} file - File object to validate
 * @param {number} maxSizeMB - Maximum size in MB (default: 5MB)
 * @returns {boolean} Whether the file is valid
 */
export const validateImage = (file, maxSizeMB = 5) => {
  // Check if it's an image
  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed");
    return false;
  }

  // Check file size (default to 5MB max)
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    alert(`Image size must be less than ${maxSizeMB}MB`);
    return false;
  }

  return true;
};

/**
 * Compress an image to reduce file size
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxWidth - Maximum width in pixels
 * @param {number} options.maxHeight - Maximum height in pixels
 * @param {number} options.quality - JPEG quality (0-1)
 * @returns {Promise<Blob>} Compressed image as a Blob
 */
export const compressImage = (
  file,
  { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = {}
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }

        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
