const express = require('express');

const router = express.Router();

const pool = require('../pool');


router.post('/updateprofile', async (req, res) => {
    try {
        const {name,email,phoneno,address,age,password } = req.body;
        const user = await pool.query("UPDATE users SET name = $1,  phoneno = $2, address = $3, age = $4,passcode =$5 WHERE email = $6 RETURNING *", [name,phoneno,address,age,password,email]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;