import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import Admin from '../models/Admin.js';

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.role === 'admin') {
      req.user = await Admin.findById(decoded.id);
      req.userType = 'admin';
    } else {
      req.user = await Client.findById(decoded.id);
      req.userType = 'client';
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userType)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.userType} is not authorized to access this route`
      });
    }
    next();
  };
};