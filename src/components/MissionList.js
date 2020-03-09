import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { missionStatusTypesMapper } from '../selectors';

import BootstrapTable from 'react-bootstrap-table-next';
import { Label, Badge, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

// =============
// MISSIONS LIST
// =============

const propTypes = {
  missions: PropTypes.array
};

const defaultProps = {
  missions: [],
};

const MissionsList = props => {
  const { t } = useTranslation();
  let missionStatusTypeMap = useSelector(missionStatusTypesMapper);

  const columns = [{
    dataField: 'name',
    text: t('mapotempo_mission_name'),
    formatter: NameFormater,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'mission_status_type_id',
    text: t('mapotempo_mission_status'),
    formatter: MissionStatusFormater,
    formatExtraData: missionStatusTypeMap,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'date',
    text: t('mapotempo_mission_estimated_time_arrival'),
    formatter: ETAFormater,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'attachment',
    text: t('mapotempo_mission_proof_of_delivery'),
    formatter: AttachmentFormater,
    headerAlign: 'right',
    align: 'right',
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }];
  return <BootstrapTable
    classes="mission-list"
    wrapperClasses='mission-list-table-wrapper'
    headerWrapperClasses='mission-list-table-header'
    headerClasses='mission-list-header'
    bodyClasses="mission-list-body"
    keyField='id'
    data={props.missions}
    columns={columns}
    hover
    bordered={ false }
    noDataIndication="No Mission found"
  />;
};

// ========
// Formater
// ========

const NameFormater = (cell, row) => {
  return (
    <div><b>{cell}</b><br/><Label>ref: {row.reference}</Label></div>);
};

const MissionStatusFormater = (cell, row, rowIndex, formatExtraData) => {
  let status = formatExtraData[cell];
  if (status)
    return (<Badge style={{ backgroundColor: status.color }}>{status.label}</Badge>);
  return cell;
};

const ETAFormater = (cell) => {
  return <Label bsStyle='default'>{new Date(cell).toLocaleString()}</Label>;
};

const AttachmentFormater = () => {
  return <React.Fragment>
    <Glyphicon glyph="camera" />
    <Glyphicon glyph="pencil" />
    <Glyphicon glyph="align-right" />
  </React.Fragment>;
};

MissionsList.propTypes = propTypes;
MissionsList.defaultProps = defaultProps;

export default MissionsList;
