const { Pool } = require('pg');
const pool = new Pool({

    user :"postgres",
    password:"spidy@Hero8",
    host:"localhost",
    port:5432,
    database:"golden"

});

module.exports = pool;