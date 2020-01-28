import React from 'react';
import { Jumbotron, Media } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pending from '../components/utils/pending';
import UserDropDown from '../components/user/user-dropdown';
import UserList from '../components/user/user-list';
import UserDetails from '../components/user/user-details';

import {fetchUsers } from '../actions/';

const LiveView = () => {
  let isFetchingUser = useSelector(state => state.fleet.users.isFetching);
  let users = useSelector(state => state.fleet.users.items);
  const [userSelected, setUserSelected] = useState(null);

  // Query users if necessary
  const dispatch = useDispatch();
  if (Object.entries(users).length === 0 && !isFetchingUser) {
    dispatch(fetchUsers());
  }

  if (useSelector(state => state.fleet.users.isFetching))
    return (<Pending message='Loading users'/>);
  
  const callback = (user) => {
    setUserSelected(user);
  };

  return (
    <Jumbotron style={{ padding: '50px' }}>
      <UserDropDown users={Object.entries(users).map((data) => data[1])} onClick={callback}></UserDropDown>
      <div style={{margin: '20px'}}/>
      <UserDetails user={userSelected}></UserDetails>
    </Jumbotron>);

};
    
export default LiveView;
