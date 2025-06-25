import mongoose from 'mongoose';

const khataSchema = new mongoose.Schema({
  supervisorName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  generation: {
    type: String,
    required: true
  },
  stock: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['started', 'in-progress', 'approved', 'rejected'],
    default: 'started'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Khata', khataSchema);