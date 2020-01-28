import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';

const ascii = ['◐', '◓', '◑', '◒'];

const Penging = (props) => {
  const [loader, setLoader] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    setTimeout(() => {
      if (isCancelled)
        return;
      let value = 0;
      if (loader < 3)
        value = loader + 1;
      setLoader(value);
    }, 55);
    return function cleanup() {
      isCancelled = true;
    };
  });
  return (
    <Jumbotron>
      <p style={{textAlign: 'center'}}>
        {ascii[loader]}
        <br />
        {props.message}
      </p>
    </Jumbotron>);
    
};

Penging.propTypes = {
  message: PropTypes.string
};


export default Penging;
