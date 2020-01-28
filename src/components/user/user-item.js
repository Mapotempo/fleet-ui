import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const UserItem = (props) => {
  return (
    <tr>
      <td><Checkbox/></td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
    </tr>);
};

UserItem.propTypes = {
  user: PropTypes.object
};

export default UserItem;
