// src/app/store.js or src/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'; // Adjust the import path as necessary
import bookingReducer from '../features/booking/bookingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

