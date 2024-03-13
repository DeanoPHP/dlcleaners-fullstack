import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import {
  createBooking,
  getTimeslots,
  deleteTimeslot,
  reset,
} from '../features/booking/bookingSlice';

function Bookings() {
  // Define months for display
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(''); // Stores selected date as a string
  const [selectedTime, setSelectedTime] = useState(''); // Separate state for selected time

  const { user, isError, isSuccess, isLoading, message, timeslots } =
    useSelector((state) => state.booking);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(timeslots);

  useEffect(() => {
    dispatch(getTimeslots());
  }, [dispatch]);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      toast.success('You are all booked in and look forward to seeing you');
      navigate('/');
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const formatDateISO = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Formats to YYYY-MM-DD
  };

  // Adjusting the handleOnClick for selectedDate formatting
  const handleOnClick = (day, cellDate) => {
    // Format the selectedDate as YYYY-MM-DD to match object keys
    const formattedDate = formatDateISO(cellDate);
    setSelectedDate(formattedDate); // Ensure this is a string in YYYY-MM-DD format
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Construct booking details
    const bookingDetails = {
      ...user.data,
      date: selectedDate,
      time: selectedTime,
    };

    dispatch(createBooking(bookingDetails))
      .then(() => {
        // Assuming timeslot.date is an ISO string and selectedDate is in 'YYYY-MM-DD' format
        const matchingTimeslot = timeslots.data.find((timeslot) => {
          const timeslotDate = new Date(timeslot.date);
          const selectedDateObj = new Date(selectedDate + 'T00:00:00.000Z'); // Parse as UTC to avoid timezone issues

          return (
            timeslotDate.getUTCFullYear() ===
              selectedDateObj.getUTCFullYear() &&
            timeslotDate.getUTCMonth() === selectedDateObj.getUTCMonth() &&
            timeslotDate.getUTCDate() === selectedDateObj.getUTCDate()
          );
        });

        if (matchingTimeslot) {
          return dispatch(deleteTimeslot(matchingTimeslot._id));
        } else {
          throw new Error('Matching timeslot not found.');
        }
      })
      .then(() => {
        toast.success('Booking successful and timeslot updated');
        navigate('/');
        dispatch(reset());
      })
      .catch((error) => {
        toast.error(
          error.message || 'An error occurred during the booking process.',
        );
      });
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const dayCells = [];
  for (
    let day = 1;
    day <=
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    day++
  ) {
    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const isToday = new Date().toDateString() === cellDate.toDateString();
    const isSelected = selectedDate === formatDateISO(cellDate);

    dayCells.push(
      <div
        className={`day${isToday ? ' today' : ''}${
          isSelected ? ' selected' : ''
        }`}
        key={day}
        onClick={() => handleOnClick(day, cellDate)}>
        {day}
      </div>,
    );
  }

  let availableTimeslots = [];

  if (selectedDate && timeslots.data && timeslots.data.length > 0) {
    availableTimeslots = timeslots.data.filter((timeslot) => {
      const timeslotDate = new Date(timeslot.date);
      const selectedDateObj = new Date(selectedDate);

      // Compare year, month, and day individually to account for timezone differences
      return (
        timeslotDate.getUTCFullYear() === selectedDateObj.getFullYear() &&
        timeslotDate.getUTCMonth() === selectedDateObj.getMonth() &&
        timeslotDate.getUTCDate() === selectedDateObj.getDate()
      );
    });
  }

  // Now use useEffect to check for and automatically set the selected time
  useEffect(() => {
    // Automatically select the time if there is exactly one timeslot available
    if (availableTimeslots.length === 1) {
      setSelectedTime(availableTimeslots[0].time);
    }
    // Ensure to include setSelectedTime in the dependency array if it's not causing any unintended re-renders
  }, [availableTimeslots, setSelectedTime]);

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
        minWidth: '100%',
        minHeight: '1200px',
        textAlign: 'center',
        marginTop: '20px',
      }}>
      <header>
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          style={{ cursor: 'pointer' }}
          onClick={prevMonth}
        />
        <h2>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          style={{ cursor: 'pointer' }}
          onClick={nextMonth}
        />
      </header>
      <div className="calendar-grid">{dayCells}</div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="timeslot">Choose a timeslot:</label>
          <select
            id="timeslot"
            name="timeslot"
            onChange={handleTimeChange}
            value={selectedTime || ''}
            required>
            {availableTimeslots.length > 0 ? (
              availableTimeslots.map((timeslot, index) => (
                <option key={timeslot._id} value={timeslot.time}>
                  {timeslot.time}
                </option>
              ))
            ) : (
              <option>No available timeslots</option>
            )}
          </select>
        </div>
        <button className="btn btn-success mt-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Bookings;
