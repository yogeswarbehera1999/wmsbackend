import express from 'express';
import Qube from '../models/Qube.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create qube fulfillment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const qube = new Qube({
      ...req.body,
      submittedBy: req.user.userId
    });
    await qube.save();
    res.status(201).json(qube);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all qubes
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'supervisor') {
      query.submittedBy = req.user.userId;
    }
    
    const qubes = await Qube.find(query).sort({ createdAt: -1 });
    res.json(qubes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update qube status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const qube = await Qube.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!qube) {
      return res.status(404).json({ message: 'Qube not found' });
    }

    res.json(qube);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;