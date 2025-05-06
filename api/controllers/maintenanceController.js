import CarMaintenance from '../models/CarMaintenance.js';
import Car from '../models/Car.js';

// @desc    Create new maintenance record
// @route   POST /api/v1/maintenance
// @access  Private (Admin)
export const createMaintenance = async (req, res, next) => {
  try {
    // Check if car exists
    const car = await Car.findById(req.body.car);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    // Create maintenance record
    const maintenance = await CarMaintenance.create(req.body);

    // Update car status to Maintenance
    car.status = 'In Garage';
    await car.save();

    res.status(201).json({
      success: true,
      data: maintenance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all maintenance records
// @route   GET /api/v1/maintenance
// @access  Private (Admin)
export const getMaintenances = async (req, res, next) => {
  try {
    const maintenances = await CarMaintenance.find()
      .populate({
        path: 'car',
        select: 'carId brand year'
      });

    res.status(200).json({
      success: true,
      count: maintenances.length,
      data: maintenances
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single maintenance record
// @route   GET /api/v1/maintenance/:id
// @access  Private (Admin)
export const getMaintenance = async (req, res, next) => {
  try {
    const maintenance = await CarMaintenance.findById(req.params.id)
      .populate({
        path: 'car',
        select: 'carId brand year'
      });

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: maintenance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update maintenance record
// @route   PUT /api/v1/maintenance/:id
// @access  Private (Admin)
export const updateMaintenance = async (req, res, next) => {
  try {
    let maintenance = await CarMaintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    // Check if maintenance is being marked as done
    const wasNotDone = !maintenance.isDone;
    const isNowDone = req.body.isDone === true;

    maintenance = await CarMaintenance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // If maintenance is marked as done, update car status back to Available
    if (wasNotDone && isNowDone) {
      const car = await Car.findById(maintenance.car);
      car.status = 'Available';
      await car.save();
    }

    res.status(200).json({
      success: true,
      data: maintenance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete maintenance record
// @route   DELETE /api/v1/maintenance/:id
// @access  Private (Admin)
export const deleteMaintenance = async (req, res, next) => {
  try {
    const maintenance = await CarMaintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        error: 'Maintenance record not found'
      });
    }

    await maintenance.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get maintenance records for a car
// @route   GET /api/v1/maintenance/car/:carId
// @access  Private (Admin)
export const getCarMaintenances = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    const maintenances = await CarMaintenance.find({ car: req.params.carId });

    res.status(200).json({
      success: true,
      count: maintenances.length,
      data: maintenances
    });
  } catch (err) {
    next(err);
  }
};