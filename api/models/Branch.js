import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const BranchSchema = new mongoose.Schema({
  branchId: {
    type: String,
    required: true,
    unique: true,
    default: () => 'BRANCH-' + uuidv4()
  },
  branchName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  images:{
    type: [String],}
}, {
  timestamps: true
});

const Branch = mongoose.model('Branch', BranchSchema);
export default Branch;