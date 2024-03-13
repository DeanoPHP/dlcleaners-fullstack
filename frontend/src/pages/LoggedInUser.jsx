import { useEffect } from "react";

function LoggedInUser() {
  const user = JSON.parse(localStorage.getItem('user'))

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

  return (
    <div style={{width: '100%', height: '600px'}}>
      <h1>You are logged in {user.data.name}</h1>
    </div>
  )
}

export default LoggedInUser
