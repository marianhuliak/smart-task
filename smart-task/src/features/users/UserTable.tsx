import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUsers, setFilter } from './userSlice';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.data);
  const filters = useSelector((state: RootState) => state.users.filters);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Filter by Name"
        />
        <input
          type="text"
          name="username"
          value={filters.username}
          onChange={handleFilterChange}
          placeholder="Filter by Username"
        />
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          placeholder="Filter by Email"
        />
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          placeholder="Filter by Phone"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
