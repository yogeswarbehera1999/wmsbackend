import mongoose from 'mongoose';

const qubeSchema = new mongoose.Schema({
  wardName: {
    type: String,
    default: 'Gopalpur NAC'
  },
  supervisorName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['MCC', 'MRF']
  },
  cubeNumber: {
    type: Number,
    required: true
  },
  photo: {
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

export default mongoose.model('Qube', qubeSchema);