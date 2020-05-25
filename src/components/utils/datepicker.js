import React, { useEffect } from 'react';
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
  useEffect(() => {
    $('#_begin_date')
      .datepicker({
        language: i18n.language,
        autoclose: true,
        calendarWeeks: true,
        todayHighlight: true,
        format: t('datepicker'),
        zIndexOffset: 1000
      })
      .on("changeDate", (e) => props.onChangeDate(e.date))
      .datepicker("setDate", props.initialDate);

  }, []);
  return <input className="form-control" type="text" name="_[begin_date]" id="_begin_date" />;
};

Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;

export default Datepicker;
