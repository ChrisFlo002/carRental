import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CarMaintenanceSchema = new mongoose.Schema(
  {
    maintenanceId: {
      type: String,
      required: true,
      unique: true,
      default: () => `MAINTENANCE-${uuidv4()}`,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarMaintenance = mongoose.model("CarMaintenance", CarMaintenanceSchema);
export default CarMaintenance;
