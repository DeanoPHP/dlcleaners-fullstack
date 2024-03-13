import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Homes from './pages/Homes';
import About from './pages/About';
import AdminHome from './pages/admin/AdminHome';
import Contact from './pages/Contact';
import Bookings from './pages/Bookings';
import LoggedInUser from './pages/LoggedInUser';

function App() {
  return (
    <>
      <Router>
        <div className="mainContainer">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homes />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/home" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
            <Route path="/loggedinuser" element={<PrivateRoute><LoggedInUser /></PrivateRoute>} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        // You can adjust the width here
        style={{ width: 'auto', maxWidth: '300px' }}
      />
    </>
  );
}

export default App;
