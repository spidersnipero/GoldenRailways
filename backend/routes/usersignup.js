const express = require('express');

const router = express.Router();

const pool = require('../pool');

router.post('/usersignup', async (req, res) => {
    try {
        const {name, email, password,age,phoneno,address } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            const newUser = await pool.query("INSERT INTO users (name, email, passcode,age,phoneno,address) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *", [name, email, password,age,phoneno,address]);
            return res.json(newUser.rows[0]);
        }
        else{
            return res.status(401).send("Email already exists");
        }
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;