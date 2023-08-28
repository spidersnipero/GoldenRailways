const express = require('express');
const router = express.Router();

const pool = require('../../pool');

router.get('/allorders', async (req, res) => {
    try {
        const data = await pool.query( "SELECT * FROM orders WHERE status=1 ");
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);
module.exports = router;