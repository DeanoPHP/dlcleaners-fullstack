import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTimeslot, reset } from '../features/booking/bookingSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function CreateTimeslot() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  const { date, time } = formData;

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.booking,
  );

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const timestampCreate = {
      date,
      time
    }

    dispatch(createTimeslot(timestampCreate))
  }

  return (
    <div>
      <h1>Create Timeslot</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="date">Enter a date</label>
          <input
            className="form-control"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Enter a time</label>
          <input
            className="form-control"
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTimeslot;
