import pool from '../config/db.js';

const getMe = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, username, email, phone, balance, created_at FROM bank_users WHERE id = ?',
            [req.user.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error('GetMe error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export { getMe };
