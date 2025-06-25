import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  citizenName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  wardNumber: {
    type: Number,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Illegal Dumping of C & D Waste',
      'Dead Animals',
      'Practice of Manual Scavenging',
      'Open Defecation',
      'Urination in Public',
      'No Electricity in Public Toilet Stagnant Water on the Road',
      'Sewerage or Storm Water Overflow',
      'Open Manholes or Drains',
      'Improper Disposal of Faccal Waste or Septage',
      'Cleaning of Sewer',
      'Public Toilet Blockage',
      'Public Toilet Cleaning',
      'Cleaning of Drain',
      'No Water Supply in Public Toilet',
      'Garbage Dump',
      'Dustbins Not Cleaned',
      'Sweeping Not Done',
      'Burning of Garbage in Open Space',
      'Garbage Vehicle Not Arrived',
      'Cleaning of Garbage from Public Spaces',
      'Cleaning of Street Roads',
      'Door-To-Door Collection Not Done'
    ]
  },
  description: {
    type: String,
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

export default mongoose.model('Complaint', complaintSchema);