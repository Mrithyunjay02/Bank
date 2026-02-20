import express from 'express';
import { getMe } from '../controllers/bankController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);

export default router;
