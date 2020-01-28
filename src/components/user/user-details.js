import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const UserDetails = (props) => {
  const getValidationState = () => {

  };
  const handleChange = (e) => {
  };

  if (!props.user)
    return (
      <h3 style={{textAlign: 'center'}}>Please select one user</h3>
    );

  console.log(props.user);
  return (
    <div>
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={getValidationState()}
        >
          <ControlLabel>User Name</ControlLabel>
          <FormControl
            disabled
            type="text"
            value={props.user.name}
            placeholder='user name'
            onChange={handleChange}
          />
          <ControlLabel>User Email</ControlLabel>
          <FormControl
            disabled
            type="text"
            value={props.user.email}
            placeholder='user email'
            onChange={handleChange}
          />
          <ControlLabel>User phone</ControlLabel>
          <FormControl
            disabled
            type="text"
            value={props.user.phone}
            placeholder='user name'
            onChange={handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object
};

export default UserDetails;
