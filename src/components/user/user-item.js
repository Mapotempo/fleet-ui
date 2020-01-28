import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const UserItem = (props) => {
  const callback = () => {
    if (props.onClick)
      props.onClick(props.user);
  };
  return (
    <tr onClick={callback}>
      <td><Checkbox style={{margin: 0}}/></td>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
    </tr>);
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default UserItem;
