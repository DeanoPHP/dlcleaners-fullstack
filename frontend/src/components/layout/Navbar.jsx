import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You are not logged in');
    } else {
      dispatch(logout(user));
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-default navbar-fixed-top navbar-dark bg-dark">
      <div id="target-nav" className="container-fluid">
        <div className="navbar-brand">Navbar</div>
        {/* Hamburger toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                } `}
                aria-current="page"
                href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                } `}>
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit', // Use inherited text color or specify as needed
                  cursor: 'pointer',
                  padding: 0,
                  marginTop: '8px',
                  marginLeft: '10px',
                }}>
                <span
                  style={{
                    color: pathname === '/admin/home' ? 'lightgreen' : '',
                  }}>
                  <span style={{ color: 'white' }}>Dropdown</span>
                </span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/bookings" className="dropdown-item">
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="dropdown-item" href="#">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="admin/home" className="dropdown-item">
                    Admin Area
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {/* Change this to user from localstorage. If user && */}
            {user ? (
              <form onSubmit={onSubmit}>
                <button type="submit">Logout</button>
              </form>
            ) : (
              <>
                <li style={{ marginRight: '20px' }}>
                  <a
                    style={{ color: 'white', textDecoration: 'none' }}
                    href="#target-login">
                    Login
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: 'white', textDecoration: 'none' }}
                    href={
                      pathname === '/'
                        ? '#target-register'
                        : '/#target-register'
                    }>
                    Register
                  </a>
                  f
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
