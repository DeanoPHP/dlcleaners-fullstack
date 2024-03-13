import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userSlice';

function GetUsers() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); // It's good practice to include dispatch here, though it's usually stable

  console.log(users);

  return (
    <div>
      <h1>Customers List</h1>
      <table className="table w-75">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Tel</th>
          </tr>
        </thead>
        <tbody>
          {users.data ? users.data.map((user) => (
            <tr key={user.id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.tel}</td>
            </tr>
          )) : <tr><td colSpan="4">No users found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default GetUsers;
