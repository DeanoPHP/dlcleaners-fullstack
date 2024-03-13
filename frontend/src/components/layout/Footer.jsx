import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import Login from "../Login"

function Footer() {
  const [isUser, setIsUser] = useState(false)

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }, [user]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h1>Let's Talk</h1>
          <p style={{color: 'gray'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, aspernatur rerum. Voluptatibus debitis tenetur iusto dolor repellat? Nihil, libero ad!</p>
        </div>
        <div className="footer-right">
          {isUser 
            ? (<>
                <h1 className="color">User Info</h1>
                <h6>SOME CODE HERE...</h6>
              </>)
            : <Login />}
        </div>
      </div>
    </footer>
  )
}

export default Footer
