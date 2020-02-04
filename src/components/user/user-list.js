import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Checkbox, Pager } from 'react-bootstrap';

import Loader from '../utils/loader';
import UserItem from './user-item';
import {fetchUsers } from '../../actions';

const UserList = (props) => {
  let users = useSelector(state => state.fleet.users.items);
  const dispatch = useDispatch();
  if (useSelector(state => state.fleet.users.isFetching))
    return (<Loader message='Loading users'/>);
  if (Object.entries(users).length === 0) {
    dispatch(fetchUsers());
  }
  const callback = (user) => {
    if (props.onClick)
      props.onClick(user);
  };
  console.log(props.users);
  return (
    <div>
      <Table hover condensed responsive>
        <thead>
          <tr>
            <th><Checkbox style={{margin: 0}}/></th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((data) => <UserItem key={data[0]} user={data[1]} onClick={callback}></UserItem>)
          }
        </tbody>
      </Table>
      <Pager>
        <Pager.Item href="#">Previous</Pager.Item>{' '}
        <Pager.Item href="#">Next</Pager.Item>
      </Pager>
    </div>
  );
};

UserList.propTypes = {
  onClick: PropTypes.func
};

export default UserList;
