import mongoose from 'mongoose';

const RentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  actualReturnDate: {
    type: Date
  },
  extraCharges: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Completed', 'Cancelled']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rent', RentSchema);