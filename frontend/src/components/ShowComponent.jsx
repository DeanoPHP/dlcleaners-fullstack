import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking, reset } from '../features/booking/bookingSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function ShowComponent() {
  const { isError, isSuccess, isLoading, message, bookings } = useSelector(
    (state) => state.booking,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getBookingFunc = async () => {
      dispatch(getBooking());
    };

    getBookingFunc()
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Why if I add this code nothing shows in my table
    if (isSuccess) {
      console.log('worked')
    }

    dispatch(reset())

  }, [isError, message, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Bookings</h1>
      <table className="table w-75">
      <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Tel</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        {bookings.data && bookings.data.map((booking, index) => (
          <tbody key={index}>
            {' '}
            {/* Adding a key for each tbody for React's reconciliation */}
            <tr>
              <th scope="row">{index + 1}</th>{' '}
              {/* Assuming you want to number each booking starting from 1 */}
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.tel}</td>
              <td>
                {new Date(booking.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </td>
              <td>{booking.time}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ShowComponent;
