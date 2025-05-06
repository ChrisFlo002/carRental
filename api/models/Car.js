import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const CarSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: true,
    unique: true,
    default: () => `CAR-${uuidv4()}`
  },
  plate:{
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true
  },
  towing: {
    type: Number,
    required: true
  },
  fuelEfficiency: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  horsepower: {
    type: Number,
    required: true
  },
  comfort: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  images:{
    type: [String],
    required: true
  },
  transmission:{
    type: String,
    required: true
  },
  fuelType:{
    type: String,
    required: true
  },
  vin:{
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Car = mongoose.model('Car', CarSchema);
export default Car;