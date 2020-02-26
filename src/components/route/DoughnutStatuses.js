import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { routeInfoSelector } from '../../selectors';
import { Doughnut } from 'react-chartjs-2';

// ==========
// ROUTE LIST
// ==========

const propTypes = {
  missionType: PropTypes.string,
  header: PropTypes.string,
  routes: PropTypes.array
};

const defaultProps = {
  missionType: 'mission',
  header: '',
  routes: []
};

const DoughnutStatuses = (props) => {
  let fullMissionStatusTypeIdsCounter = useSelector(state => props.routes.reduce((accumulator, route) => {
    let routeInfo = routeInfoSelector(state, route.id);
    routeInfo[props.missionType].missionStatusTypeCountByIds.forEach(info => {
      let lastCount = accumulator[info.reference] ? accumulator[info.reference].count : 0;
      accumulator[info.reference] = {...info, count: (lastCount + info.count)};
    });
    return accumulator;
  },{}));

  let dataset = [1];
  let backgroundColor = [];
  let labels = [""];

  if (Object.keys(fullMissionStatusTypeIdsCounter).length > 0) {
    dataset = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => fullMissionStatusTypeIdsCounter[id].count);
    backgroundColor = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => fullMissionStatusTypeIdsCounter[id].color);
    labels = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => fullMissionStatusTypeIdsCounter[id].label);
  }
  let data = {
    datasets: [{
      data: dataset,
      backgroundColor: backgroundColor,
      hoverBackgroundColor: backgroundColor,
    }],
    labels: labels
  };
  return (
    <div>
      <Doughnut data={data} />
      <h3 style={{ textAlign: 'center' }}>{ props.header }</h3>
    </div>
  );
};

DoughnutStatuses.propTypes = propTypes;
DoughnutStatuses.defaultProps = defaultProps;

export default DoughnutStatuses;
