import Car from '../models/Car.js';

// @desc    Get all cars
// @route   GET /api/v1/cars
// @access  Public
export const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find()
      .populate('branch');

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single car
// @route   GET /api/v1/cars/:id
// @access  Public
export const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('branch');

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new car
// @route   POST /api/v1/cars
// @access  Private (Admin)
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json({
      success: true,
      data: car
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update car
// @route   PUT /api/v1/cars/:id
// @access  Private (Admin)
export const updateCar = async (req, res, next) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete car
// @route   DELETE /api/v1/cars/:id
// @access  Private (Admin)
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    await car.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get available cars
// @route   GET /api/v1/cars/available
// @access  Public
export const getAvailableCars = async (req, res, next) => {
  try {

    const cars = await Car.find({ status: "Available" })
      .populate('branch');

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    next(err);
  }
};