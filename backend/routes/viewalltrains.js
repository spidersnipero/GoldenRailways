const express = require('express');
const router = express.Router();

const pool = require('../pool');

router.get('/viewalltrains', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM trainsinfo ORDER BY id ASC");
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;