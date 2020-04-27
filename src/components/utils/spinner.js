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
    <div className={'mtf-view-container mtf-spinner-container'} >
      <div className={'mtf-spinner'} />
      <p style={{}}>{t('mapotempo_live_server')}</p>
      <p style={{}}>{props.message}</p>
    </div>);
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;

