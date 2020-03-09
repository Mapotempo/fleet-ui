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
    <Jumbotron style={{height: '100%', margin: '0'}}>
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)'}}>
        <div className={styles.loader} />
        <p style={{textAlign: 'center'}}>{props.message}</p>
      </div>
    </Jumbotron>);
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

