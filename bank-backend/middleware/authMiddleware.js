import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await pool.execute(
            'SELECT id FROM bank_tokens WHERE user_id = ? AND token = ?',
            [decoded.id, token]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Token is invalid or has been revoked.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired.' });
        }
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

export { verifyToken };
