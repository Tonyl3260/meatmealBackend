const express = require('express');
const router = express.Router();
const pool = require('../../db.js');

// Get favorite recipes for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT r.id, r.title, r.image_url
            FROM recipes r
            JOIN favorites f ON r.id = f.recipe_id
            WHERE f.user_id = $1;
        `;
        const { rows } = await pool.query(query, [userId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

// Add a recipe to favorites
router.post('/', async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const query = `
            INSERT INTO favorites (user_id, recipe_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
        `;
        await pool.query(query, [userId, recipeId]);
        res.status(201).json({ message: 'Recipe added to favorites' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

// Remove a recipe from favorites
router.delete('/', async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const query = `
            DELETE FROM favorites
            WHERE user_id = $1 AND recipe_id = $2;
        `;
        await pool.query(query, [userId, recipeId]);
        res.status(200).json({ message: 'Recipe removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

module.exports = router;
