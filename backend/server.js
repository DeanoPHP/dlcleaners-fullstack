const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const connect = require('./config/db');
const PORT = process.env.PORT || 3001;

connect()

const app = express()

app.use(express.json()) 

app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/bookings', require('./routes/bookingRoutes'))
app.use('/api/v1/timeslot', require('./routes/dateTimeslots'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({
            success: true,
            msg: 'Welcome to Dee Massages'
        })
    }) 
}
    
app.listen(PORT, () => console.log(`You are listening on port ${PORT}`))