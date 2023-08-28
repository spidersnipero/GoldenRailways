const express = require('express');
const router = express.Router();

const pool = require('../../pool');

router.post('/rejectorder', async (req, res) => {
    try {
        const { trainno, email,origin,destination} = req.body;
        const data  = await pool.query("UPDATE orders SET status=3 WHERE trainno=$1 AND email=$2 AND origin=$3 AND destination=$4 RETURNING *",[trainno,email,origin,destination]);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);
module.exports = router;