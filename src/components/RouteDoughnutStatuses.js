import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { missionStatusTypesMapper } from '../selectors';

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
  let missionStatusTypes = useSelector(missionStatusTypesMapper);
  let statusesCountByRef = props.routes.reduce((resMap, route) => {
    for (let [missionStatusTypeId, value] of Object.entries(route.extraInfo[props.missionType].statusCounter)) {
      let missionStatusType = missionStatusTypes[missionStatusTypeId];
      if (!missionStatusType) {
        console.warn('MissionStatusTypeId not found', missionStatusType);
        continue;
      }
      let entry = resMap[missionStatusType.reference] ? resMap[missionStatusType.reference] : {count: 0, color: missionStatusType.color, label: missionStatusType.label};
      entry.count += value;
      resMap[missionStatusType.reference] = entry;
    }
    return resMap;
  }, {});

  let dataset = [1];
  let backgroundColor = [];
  let labels = [""];

  if (Object.keys(statusesCountByRef).length > 0) {
    dataset = Object.keys(statusesCountByRef).map((id) => statusesCountByRef[id].count);
    backgroundColor = Object.keys(statusesCountByRef).map((id) => statusesCountByRef[id].color);
    labels = Object.keys(statusesCountByRef).map((id) => statusesCountByRef[id].label);
  }
  let data = {
    datasets: [{
      data: dataset,
      backgroundColor: backgroundColor,
      hoverBackgroundColor: backgroundColor
    }],
    labels: labels
  };
  let options = {
    title: {
      display: true,
      text: props.header,
      fontSize: 16
    },
    legend: {
      position: 'right'
    }};
  return (
    <Doughnut data={data} options={options}/>
  );
};

DoughnutStatuses.propTypes = propTypes;
DoughnutStatuses.defaultProps = defaultProps;

export default DoughnutStatuses;
