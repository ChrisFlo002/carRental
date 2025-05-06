// utils/helper.js

/**
 * Format a date into a more readable string.
 */
exports.formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  /**
   * Handle API success responses in a consistent way.
   */
  exports.sendSuccessResponse = (res, data, message = "Operation successful") => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Handle API error responses in a consistent way.
   */
  exports.sendErrorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  };
  
  /**
   * Generate a random unique ID (for example, for temporary keys or tokens).
   */
  exports.generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); // Simple random ID
  };
  