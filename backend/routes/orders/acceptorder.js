const express = require('express');
const router = express.Router();

const pool = require('../../pool');

router.post('/acceptorder', async (req, res) => {
    try {
        const { trainno, email,origin,destination} = req.body;
        console.log(trainno,email,origin,destination);
        const inidata = await pool.query("SELECT * FROM orders WHERE trainno=$1 AND email=$2 AND origin=$3 AND destination=$4",[trainno,email,origin,destination]);
        const data  = await pool.query("UPDATE orders SET status=2 WHERE trainno=$1 AND email=$2 AND origin=$3 AND destination=$4 RETURNING *",[trainno,email,origin,destination]);
        console.log(inidata.rows);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);
module.exports = router;