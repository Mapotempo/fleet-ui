import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import UserItem from './user-item';

const UserList = () => {
  const [loader, setLoader] = useState(0);
  let users = useSelector(state => state.fleet.users.items);
  let isFetching = useSelector(state => state.fleet.users.isFetching);

  useEffect(() => {
    if (isFetching) {
      setTimeout(() => {
        if (loader < 5)
          setLoader(loader + 1);
        else
          setLoader(0);
      }, 500);
    }
  });

  if (isFetching)
    return ('load users' + '.'.repeat(loader));

  return (
    <ListGroup>
      {
        Object.entries(users).map((data) => <UserItem key={data[0]} user={data[1]}></UserItem>)
      }
    </ListGroup>);
};

export default UserList;
