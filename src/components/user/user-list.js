import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Checkbox } from 'react-bootstrap';

import Pending from '../utils/pending';
import UserItem from './user-item';
import {fetchUsers } from '../../actions';

const UserList = () => {
  let users = useSelector(state => state.fleet.users.items);
  const dispatch = useDispatch();
  if (useSelector(state => state.fleet.users.isFetching))
    return (<Pending message='load users'/>);
  if (Object.entries(users).length === 0) {
    dispatch(fetchUsers());
  }
  return (
    <Table>
      <thead>
        <tr>
          <th><Checkbox/></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.entries(users).map((data) => <UserItem key={data[0]} user={data[1]}></UserItem>)
        }
      </tbody>
    </Table>);
};

export default UserList;
