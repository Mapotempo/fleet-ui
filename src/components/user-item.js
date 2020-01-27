import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Checkbox } from 'react-bootstrap';

const UserItem = (props) => {
  return (
    <ListGroupItem >
      <Checkbox style={{ display: 'inline-block' }}></Checkbox>
      {
        props.user.email
      }
    </ListGroupItem>);
};

UserItem.propTypes = {
  user: PropTypes.object
};

export default UserItem;
