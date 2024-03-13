const express = require('express');
const dotenv = require('dotenv').config();
const connect = require('./config/db');
const PORT = process.env.PORT || 3001;

connect()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Welcome to Dee Massages'
    })
})  

app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/bookings', require('./routes/bookingRoutes'))
app.use('/api/v1/timeslot', require('./routes/dateTimeslots'))
    
app.listen(PORT, () => console.log(`You are listening on port ${PORT}`))