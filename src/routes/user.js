const express = require('express');
const router = express.Router();
const pool = require('../../db.js');

router.post('/sync', async (req, res) => {
    const { uid, email, username } = req.body;
    
    try {
        const query = `
            INSERT INTO users (id, email, username)
            VALUES ($1, $2, $3)
            ON CONFLICT (id) DO NOTHING;
        `;
        await pool.query(query, [uid, email, username]);
        res.status(200).json({ message: 'User synced successfully' });
    } catch (error) {
        console.error('Error syncing user:', error); 
        res.status(500).json({ error: 'Failed to sync user' });
    }
});


module.exports = router;
