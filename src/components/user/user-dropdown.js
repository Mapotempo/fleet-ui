import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const UserDropDown = (props) => {
  const callback = (user) => {
    if (props.onClick)
      props.onClick(user);
  };
  return (
    <DropdownButton id='user-dropdown' title='Select user'>
      {
        props.users.map((user) => <MenuItem key={user.id} onClick={() => callback(user) }>{user.name} - {user.email}</MenuItem>)
      }
    </DropdownButton>
  );
};

UserDropDown.propTypes = {
  users: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default UserDropDown;
