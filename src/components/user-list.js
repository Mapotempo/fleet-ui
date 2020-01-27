import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import UserItem from './user-item';

const UserList = () => {
  const [loader, setLoader] = useState(0);
  let users = useSelector(state => state.fleet.users.items);
  let isFetching = useSelector(state => state.fleet.users.isFetching);
  if (isFetching) {
    setTimeout(() => {
      setLoader(loader + 1);
    }, 200);
    if (loader > 3)
      setLoader(0);
    return ('.'.repeat(loader));
  }

  return (
    <ListGroup>
      {
        Object.entries(users).map((data) => <UserItem key={data[0]} user={data[1]}></UserItem>)
      }
    </ListGroup>);
};

export default UserList;
