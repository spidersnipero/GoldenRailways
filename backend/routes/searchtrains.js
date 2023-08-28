const express = require('express');
const router = express.Router();

const pool = require('../pool');

router.post('/searchtrains', async (req, res) => {
    try {
        const {origin, destination} = req.body;
        console.log(req.body);
        const orgindata = await pool.query("SELECT * FROM trainstimings WHERE location = $1", [origin]);
        const destinationdata = await pool.query("SELECT * FROM trainstimings WHERE location = $1", [destination]);
        const data = [];
        orgindata.rows.forEach((train1) => {
            destinationdata.rows.forEach((train2) => {
                if (train1.id === train2.id) {
                    if(train1.hours < train2.hours){
                        data.push({trainno:train1.id,origin:train1.location,destination:train2.location,departure:{hours:train1.hours,minutes:train1.minutes},arrival:{hours:train2.hours,minutes:train2.minutes}});
                    }
                    else if(train1.hours ===train2.hours && train1.minutes < train2.minutes){
                        data.push({trainno:train1.trainno,origin:train1.location,destination:train2.location,departure:train2.time,arrival:train1.time});
                    }
                }
            })
        })
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;