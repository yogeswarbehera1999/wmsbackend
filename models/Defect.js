import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  supervisorName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  machineName: {
    type: String,
    required: true,
    enum: [
      'Sheaving/Screening Machine',
      'Balling Machine',
      'Incinerator',
      'Grass Cutter',
      'Tree Cutter',
      'Greese Gun',
      'Shreader Machine'
    ]
  },
  description: {
    type: String,
    required: true
  },
  defectImage: {
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

export default mongoose.model('Defect', defectSchema);