import axios from "axios";

const API_URL = '/api/v1/bookings/'
const API_TIMESLOT = '/api/v1/timeslot'

const createBooking = async (bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, bookingData, config)
    return response.data
}

// @todo - getBookings
const getBooking = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// @todo - getIndividual booking 
// Route - API_URL
const getBookingById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_TIMESLOT}/${id}`, config)
    return response.data
}

// @todo - create timeslot
// Route - API_TIMESLOT
const createTimeslot = async (timeslotData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_TIMESLOT, timeslotData, config)
    return response.data
}

// @todo - gettimeslot
// Route - API_TIMESLOT
const getTimeslots = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_TIMESLOT, config)
    return response.data
}

const deleteTimeslot = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_TIMESLOT}/${id}`, config)
    return response.data
}

const bookingService = {
    createBooking,
    getBooking,
    createTimeslot,
    getTimeslots,
    getBookingById,
    deleteTimeslot
}

export default bookingService