import Branch from '../models/Branch.js';
import Car from '../models/Car.js';

// @desc    Get all branches
// @route   GET /api/v1/branches
// @access  Public
export const getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find();

    res.status(200).json({
      success: true,
      count: branches.length,
      data: branches
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single branch
// @route   GET /api/v1/branches/:id
// @access  Public
export const getBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    res.status(200).json({
      success: true,
      data: branch
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create branch
// @route   POST /api/v1/branches
// @access  Private (Admin)
export const createBranch = async (req, res, next) => {
  try {
    const branch = await Branch.create(req.body);

    res.status(201).json({
      success: true,
      data: branch
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update branch
// @route   PUT /api/v1/branches/:id
// @access  Private (Admin)
export const updateBranch = async (req, res, next) => {
  try {
    let branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: branch
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete branch
// @route   DELETE /api/v1/branches/:id
// @access  Private (Admin)
export const deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    // Check if branch has cars
    const hasCars = await Car.countDocuments({ branch: req.params.id });

    if (hasCars > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete branch with associated cars'
      });
    }

    await branch.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get cars in a branch
// @route   GET /api/v1/branches/:id/cars
// @access  Public
export const getBranchCars = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    const cars = await Car.find({ branch: req.params.id });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    next(err);
  }
};