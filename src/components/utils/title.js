// React
import React from 'react';
import PropTypes from 'prop-types';

export const Title = (props) => {
  return (
    <h4>
      {props.text}
      <div className="mtf-title-separator"/>
    </h4>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired
};
