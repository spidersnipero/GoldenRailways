const express = require('express');
const router = express.Router();

const pool = require('../pool');


router.post('/singletrain', async (req, res) => {
    try {
        const {id} = req.body;
        console.log(req.body);
        const data = await pool.query("SELECT * FROM trainsinfo WHERE id = $1", [id]);
        console.log(data.rows);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;