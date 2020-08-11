// React
import React from 'react';
import PropTypes from 'prop-types';

const address = ({ city, country, detail, postalcode, state, street}) => {
  return (
    <div style={{ textAlign: 'center', fontWeight: 'bold'}}>
      <p>{street}</p>
      <p>{detail}</p>
      <p>{postalcode} {city} {state}</p>
      <p>{country}</p>
    </div>
  );
};

address.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  detail: PropTypes.string,
  postalcode: PropTypes.string,
  state: PropTypes.string,
  street: PropTypes.string
};

address.defaultProps = {
  city: "",
  country: "",
  detail: "",
  postalcode: "",
  state: "",
  street: ""
};

address.def;
export default address;
