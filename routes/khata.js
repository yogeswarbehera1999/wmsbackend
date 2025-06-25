import express from 'express';
import Khata from '../models/Khata.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create khata entry
router.post('/', authenticateToken, async (req, res) => {
  try {
    const khata = new Khata({
      ...req.body,
      submittedBy: req.user.userId
    });
    await khata.save();
    res.status(201).json(khata);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all khata entries
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'supervisor') {
      query.submittedBy = req.user.userId;
    }
    
    const khatas = await Khata.find(query).sort({ createdAt: -1 });
    res.json(khatas);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update khata status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const khata = await Khata.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!khata) {
      return res.status(404).json({ message: 'Khata not found' });
    }

    res.json(khata);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;