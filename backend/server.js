const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const port =  8000;

const userlogin = require('./routes/userlogin');
const usersignup = require('./routes/usersignup');
const adminlogin = require('./routes/adminlogin');
const viewalltrains = require('./routes/viewalltrains');
const searchtrains = require('./routes/searchtrains');
const singletrain = require('./routes/singletrain');
const createorder = require('./routes/orders/createorder');
const userorders = require('./routes/orders/userorders');
const acceptorder = require('./routes/orders/acceptorder');
const rejectorder = require('./routes/orders/rejectorder');
const allorders  = require('./routes/orders/allorders');
const updateprofile = require('./routes/updateprofile');

const app = express();

app.use(bp.json());
app.use(cors());

// routes
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/userlogin', userlogin);
app.post('/usersignup', usersignup);
app.post('/adminlogin', adminlogin);
app.get('/viewalltrains', viewalltrains);
app.post('/searchtrains', searchtrains)
app.post('/singletrain', singletrain)
app.post('/createorder', createorder)
app.post('/userorders', userorders)
app.post('/acceptorder', acceptorder)
app.post('/rejectorder', rejectorder)
app.get('/allorders', allorders)
app.post('/updateprofile', updateprofile)



// server
app.listen(port, () => console.log('SIR YES SIR!'));