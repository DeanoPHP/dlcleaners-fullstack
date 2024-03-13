import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from './bookingServices';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
  bookings: {},
  timeslots: {},
};

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      const token = user.data.token;
      return await bookingService.createBooking(bookingData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getBooking = createAsyncThunk(
  'booking/getBooking',
  async (thunkAPI) => {
    try {
      const token = user.data.token;
      return await bookingService.getBooking(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// @todo - create all other asyncThunc
// @todo - Remember to include the builder
export const getBookingById = createAsyncThunk('booking/byid', async (id, thunkAPI) => {
  try {
    const token = user.data.token
    return await bookingService.bookingById(id, token)
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
  }
})

export const createTimeslot = createAsyncThunk(
  'timeslot/create',
  async (timeslotData, thunkAPI) => {
    try {
      // get the current user token
      const token = user.data.token;
      return await bookingService.createTimeslot(timeslotData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getTimeslots = createAsyncThunk(
  'timeslot/getTimeslot',
  async (thunkAPI) => {
    try {
      // get the current user token
      const token = user.data.token;
      return await bookingService.getTimeslots(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteTimeslot = createAsyncThunk('timeslot/delete', async (id, thunkAPI) => {
  try {
    const token = user.data.token;
    return await bookingService.deleteTimeslot(id, token)
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
  }
})

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createTimeslot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTimeslot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.timeslots = action.payload
      })
      .addCase(createTimeslot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTimeslots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTimeslots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeslots = action.payload;
      })
      .addCase(getTimeslots.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookingById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingById.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTimeslot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTimeslot.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTimeslot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
