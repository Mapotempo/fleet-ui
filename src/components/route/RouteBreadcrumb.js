// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DatePicker from "../utils/datepicker";
import { formatLocalDashedDate } from '../../lib/dateUtils';

// Component
import { Breadcrumb } from 'react-bootstrap';

const RouteBreadcrumb = (props) => {
  const { t, i18n } = useTranslation();
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));

  const handleChange = (value) => props.onDateSelected(value);

  return (
    <Breadcrumb style={{ fontSize: '24px' }}>
      <Breadcrumb.Item active={!props.routeId} onClick={() => { if (props.routeId) { props.onBackClick(); } }}>
        {t("route.routes_of")}
        { props.routeId ? formatLocalDashedDate(props.selectedDate, i18n.language) :
          <DatePicker
            style={{ display: 'inline-block', width: "150px", fontSize: '24px' }}
            initialDate={props.selectedDate}
            disabled={props.routeId}
            onChangeDate={handleChange} />
        }
      </Breadcrumb.Item>
      {route ? (<Breadcrumb.Item active>{route.name}</Breadcrumb.Item>) : null}
    </Breadcrumb>
  );
};

RouteBreadcrumb.propTypes = {
  onDateSelected: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  routeId: PropTypes.string,
  onBackClick: PropTypes.func
};

RouteBreadcrumb.defaultProps = {
  onDateSelected: () => {},
  selectedDate: new Date(),
  routeId: null
};


export default RouteBreadcrumb;
