import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles.css';
import { Jumbotron } from 'react-bootstrap';

const propTypes = {
  message: PropTypes.string
};

const defaultProps = {
  message: '',
};

const Loader = (props) => {
  return (
    <Jumbotron>
      <div className={styles.loader} />
      <p style={{textAlign: 'center'}}>{props.message}</p>
    </Jumbotron>);
};


Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
