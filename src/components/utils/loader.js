import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const propTypes = {
  message: PropTypes.string
};

const defaultProps = {
  message: '',
};

const Loader = (props) => {
  const { t } = useTranslation();
  return (
    <div className='mtf-view-container' style={{height: '100%'}}>
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)'}}>
        <div className={'mtf-loader'} />
        <p style={{textAlign: 'center'}}>{t('mapotempo_live_server')}</p>
        <p style={{textAlign: 'center'}}>{props.message}</p>
      </div>
    </div>);
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

