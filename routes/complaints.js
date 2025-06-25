import express from 'express';
import Complaint from '../models/Complaint.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create complaint
router.post('/', authenticateToken, async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      submittedBy: req.user.userId
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all complaints
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'citizen') {
      query.submittedBy = req.user.userId;
    }
    
    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update complaint status (admin only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;