import Register from '../Register'

function AfterHeader() {
  return (
      <div className="afterHeader">
        <div className="info d-flex justify-content-center align-items-center text-center">
          <p className="display-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            eum, sint corporis possimus temporibus consectetur est. Earum
            provident perspiciatis quas aut veniam magni sit, dolor officia
            delectus!!
          </p>
        </div>
        <div className="afterHead-right">
          <div id="target-register" className="formContainer">
            <h2>Register With Us</h2>
            <Register />
          </div>
        </div>
      </div>
  );
}

export default AfterHeader
