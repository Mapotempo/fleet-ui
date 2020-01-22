import React, { Component } from 'react'
import { ListGroupItem, Checkbox } from 'react-bootstrap';

export default (props) => {
  return (
    <ListGroupItem >
      <Checkbox style={{ display: 'inline-block' }}></Checkbox>
      {
        props.user.email
      }
    </ListGroupItem>)
}