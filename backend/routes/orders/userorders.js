const express = require('express');
const router = express.Router();

const pool = require('../../pool');


router.post('/userorders', async (req, res) => {
    try {
        const { email} = req.body;
        const data = await pool.query( "SELECT * FROM orders WHERE email=$1",[email]);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;