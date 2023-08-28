
const express = require('express');
const router = express.Router();

const pool = require('../../pool');

router.post('/createorder', async (req, res) => {
    try {
        const { trainno, email, price,status,origin,destination,name} = req.body;

        const data = await pool.query
        ( "INSERT INTO orders (trainno, email, price,status,origin,destination,name) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *", 
        [trainno, email, price,status,origin,destination,name]);

        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);
module.exports = router;