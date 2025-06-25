import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock vehicle location data
const vehicleLocation = {
  id: 'WM001',
  name: 'Waste Collection Vehicle 1',
  latitude: 20.2961,
  longitude: 85.8245,
  lastUpdated: new Date(),
  status: 'active'
};

// Get vehicle location
router.get('/location', authenticateToken, async (req, res) => {
  try {
    // Simulate slight movement
    vehicleLocation.latitude += (Math.random() - 0.5) * 0.001;
    vehicleLocation.longitude += (Math.random() - 0.5) * 0.001;
    vehicleLocation.lastUpdated = new Date();
    
    res.json(vehicleLocation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;