import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function() {
      return this.role !== 'citizen';
    }
  },
  phone: {
    type: String,
    required: function() {
      return this.role === 'citizen';
    }
  },
  password: {
    type: String,
    required: function() {
      return this.role !== 'citizen';
    }
  },
  role: {
    type: String,
    enum: ['citizen', 'supervisor', 'admin'],
    required: true
  },
  otp: {
    type: String,
    required: false
  },
  otpExpires: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);