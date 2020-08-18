import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import $ from 'jquery';

// export for others scripts to use
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr-CH.min';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.en-GB.min';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min';

/**
 * Dapicker
 * TODO: explain ...
 */
const propTypes = {
  onChangeDate: PropTypes.func,
  initialDate: PropTypes.instanceOf(Date)
};

const defaultProps = {
  onChangeDate: () => {},
  initialDate: new Date()
};

const Datepicker = (props) => {
  const { t, i18n} = useTranslation();
  const [buttonId] = useState(`bootstrap-date-picker-${Math.floor(Math.random()*10000000000)}`);

  useEffect(() => {
    $(`#${buttonId}`)
      .datepicker({
        language: i18n.language,
        autoclose: true,
        calendarWeeks: true,
        todayHighlight: true,
        format: t('datepicker'),
        zIndexOffset: 1000
      })
      .on("changeDate", (e) => {
        if (e && e.date)
          props.onChangeDate(e.date);
      })
      .datepicker("setDate", props.initialDate);

  }, []);
  return <input className="form-control" style={props.style} disabled={props.disabled} type="text" name="bootstrap-date-picker" id={buttonId} />;
};

Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;

export default Datepicker;
