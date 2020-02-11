import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { missionStatusTypesMapper } from '../../selectors';

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
  let missionStatusTypesMap = useSelector(missionStatusTypesMapper);
  let fullMissionStatusTypeIdsCounter = {};
  props.routes.forEach(route => {
    Object.keys(route.info[props.missionType].missionStatusTypeIdsCounter).forEach((id) => {
      let count = fullMissionStatusTypeIdsCounter[id] ? fullMissionStatusTypeIdsCounter[id] : 0;
      fullMissionStatusTypeIdsCounter[id] = count + route.info[props.missionType].missionStatusTypeIdsCounter[id];
    });
  });

  let dataset = [1];
  let backgroundColor = [];
  let labels = [""];
  if (Object.keys(fullMissionStatusTypeIdsCounter).length > 0) {
    dataset = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => fullMissionStatusTypeIdsCounter[id]);
    backgroundColor = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => missionStatusTypesMap[id].color);
    labels = Object.keys(fullMissionStatusTypeIdsCounter).map((id) => missionStatusTypesMap[id].label);
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
