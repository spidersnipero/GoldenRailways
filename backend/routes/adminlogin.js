const express = require('express');

const router = express.Router();

const pool = require('../pool');

router.post('/adminlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).send("Invalid Email");
        }
        if (user.rows[0].passcode !== password) {
            return res.status(401).send("Invalid Password");
        }
        res.json(user.rows[0]);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;