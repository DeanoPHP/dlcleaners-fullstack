import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // @todo - check whether user is admin
      if (user.data.isAdmin) {
        navigate('/admin/home')
      } else {
        navigate('/loggedinuser#target-nav');
      } 
    }

    dispatch(reset())

    // eslint-disable-next-line
  }, [isError, message, isSuccess, user, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));

    setFormData({
      email: '',
      password: '',
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form id="target-login" onSubmit={onSubmit}>
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <a
          style={{ color: '#fff', textDecoration: 'none' }}
          className="m-4"
          href="#target-nav">
          Go to top
        </a>
      </div>
    </form>
  );
}

export default Login;
