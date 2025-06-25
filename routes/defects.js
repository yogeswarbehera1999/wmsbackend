import express from 'express';
import Defect from '../models/Defect.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create defect report
router.post('/', authenticateToken, async (req, res) => {
  try {
    const defect = new Defect({
      ...req.body,
      submittedBy: req.user.userId
    });
    await defect.save();
    res.status(201).json(defect);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all defects
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'supervisor') {
      query.submittedBy = req.user.userId;
    }
    
    const defects = await Defect.find(query).sort({ createdAt: -1 });
    res.json(defects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update defect status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const defect = await Defect.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!defect) {
      return res.status(404).json({ message: 'Defect not found' });
    }

    res.json(defect);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;