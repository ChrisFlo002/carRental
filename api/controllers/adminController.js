import Admin from '../models/Admin.js';

// @desc    Register admin
// @route   POST /api/v1/admins/register
// @access  Private (Admin)
export const register = async (req, res, next) => {
  try {
    const { userId, names, email, password, phone, role } = req.body;

    // Create admin
    const admin = await Admin.create({
      userId,
      names,
      email,
      password,
      phone,
      role
    });

    sendTokenResponse(admin, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login admin
// @route   POST /api/v1/admins/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    sendTokenResponse(admin, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in admin
// @route   GET /api/v1/admins/me
// @access  Private (Admin)
export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update admin details
// @route   PUT /api/v1/admins/updatedetails
// @access  Private (Admin)
export const updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      names: req.body.names,
      email: req.body.email,
      phone: req.body.phone
    };

    const admin = await Admin.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update password
// @route   PUT /api/v1/admins/updatepassword
// @access  Private (Admin)
export const updatePassword = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('+password');

    // Check current password
    if (!(await admin.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    admin.password = req.body.newPassword;
    await admin.save();

    sendTokenResponse(admin, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all admins
// @route   GET /api/v1/admins
// @access  Private (Admin)
export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = admin.getSignedJwtToken();

  res.status(statusCode).json({
    user: admin,
    profil: admin.role,
    success: true,
    token
  });
};