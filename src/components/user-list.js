import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import FleetGuard from './utils/guards';
import Pending from './utils/pending';
import UserItem from './user-item';
import {fetchUsers } from '../actions';

const UserList = () => {
  let users = useSelector(state => state.fleet.users.items);
  let isFetching = useSelector(state => state.fleet.users.isFetching);
  const dispatch = useDispatch();
  if (isFetching)
    return (<Pending message='load users'/>);
  if (Object.entries(users).length === 0) {
    dispatch(fetchUsers());
  }
  return (
    <ListGroup>
      {
        Object.entries(users).map((data) => <UserItem key={data[0]} user={data[1]}></UserItem>)
      }
    </ListGroup>);
};

export default FleetGuard(UserList);
