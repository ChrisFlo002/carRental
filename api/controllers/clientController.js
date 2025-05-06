import Client from '../models/Client.js';

// @desc    Register client
// @route   POST /api/v1/clients/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { userId, names, email, password, phone } = req.body;

    // Create client
    const client = await Client.create({
      userId,
      names,
      email,
      password,
      phone,
      isActive: true
    });

    sendTokenResponse(client, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login client
// @route   POST /api/v1/clients/login
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

    // Check for client
    const client = await Client.findOne({ email }).select('+password');

    if (!client) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!client.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Your account is deactivated. Please contact support.'
      });
    }

    // Check if password matches
    const isMatch = await client.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    sendTokenResponse(client, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in client
// @route   GET /api/v1/clients/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const client = await Client.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update client details
// @route   PUT /api/v1/clients/updatedetails
// @access  Private
export const updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      names: req.body.names,
      email: req.body.email,
      phone: req.body.phone
    };

    const client = await Client.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update password
// @route   PUT /api/v1/clients/updatepassword
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const client = await Client.findById(req.user.id).select('+password');

    // Check current password
    if (!(await client.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    client.password = req.body.newPassword;
    await client.save();

    sendTokenResponse(client, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete client account
// @route   DELETE /api/v1/clients/:id
// @access  Private (Admin)
export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    await client.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all clients
// @route   GET /api/v1/clients
// @access  Private (Admin)
export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (client, statusCode, res) => {
  // Create token
  const token = client.getSignedJwtToken();

  res.status(statusCode).json({
    user:client,
    profil:"client",
    success: true,
    token
  });
};