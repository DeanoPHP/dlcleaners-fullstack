import { useState, useEffect } from 'react';
import { register, reset } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    password: '',
  });

  const { name, email, tel, password } = formData;
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
    
    // eslint-disable-next-line
  }, [isError, isSuccess, message, user, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if ((!name, !email, !tel, !password)) {
      toast.error('All fields must be filled in');
    }

    const userData = {
      name,
      email,
      tel,
      password,
    };

    dispatch(register(userData));
    setFormData({
        name: '',
        email: '',
        tel: '',
        password: ''
    })
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          value={email}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tel">Telephone Number</label>
        <input
          type="text"
          className="form-control"
          name="tel"
          value={tel}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tel">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default Register;
