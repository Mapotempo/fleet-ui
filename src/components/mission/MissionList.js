import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { missionStatusTypesMapper } from '../../selectors';

import BootstrapTable from 'react-bootstrap-table-next';
import { Label, Badge, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

import { surveyType } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

// =============
// MISSIONS LIST
// =============

const propTypes = {
  missions: PropTypes.array,
  onMissionSurveyClick: PropTypes.func
};

const defaultProps = {
  missions: [],
  onMissionSurveyClick: () => {}
};

const MissionsList = props => {
  const { t } = useTranslation();
  let missionStatusTypeMap = useSelector(missionStatusTypesMapper);

  const columns = [{
    dataField: 'name',
    text: t('mission.list_header.name'),
    formatter: NameFormater,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'mission_status_type_id',
    text: t('mission.list_header.status'),
    formatter: MissionStatusFormater,
    formatExtraData: missionStatusTypeMap,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'date',
    text: t('mission.list_header.estimated_time_arrival'),
    formatter: ETAFormater,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow'
  }, {
    dataField: 'attachment',
    text: t('mission.list_header.proof_of_delivery'),
    formatter: AttachmentFormater,
    formatExtraData: props.onMissionSurveyClick,
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
    <div>
      <b>{cell}</b><br />
      {row.reference ? <Label>ref: {row.reference}</Label> : null}
    </div>);
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

const AttachmentFormater = (cell, row, rowIndex, formatExtraData) => {
  let picture = row.survey_pictures && row.survey_pictures.length > 0;
  let signature = row.survey_signature;
  let comment = row.survey_comment;
  let barcode = row.survey_barcodes && row.survey_barcodes.length > 0;
  let address = row.survey_address;
  // let temperature = row.survey_temperature;
  return <ButtonGroup>
    <Button bsStyle={picture ? "info": "default"} disabled={!picture} onClick={() => formatExtraData(row, surveyType.PICTURE)}><Glyphicon glyph="camera" /></Button>
    <Button bsStyle={signature ? "info": "default"} disabled={!signature} onClick={() => formatExtraData(row, surveyType.SIGNATURE)}><Glyphicon glyph="pencil" /></Button>
    <Button bsStyle={comment ? "info": "default"} disabled={!comment} onClick={() => formatExtraData(row, surveyType.COMMENT)}><Glyphicon glyph="comment" /></Button>
    <Button bsStyle={barcode ? "info": "default"} disabled={!barcode} onClick={() => formatExtraData(row, surveyType.BARCODE)}><Glyphicon glyph="barcode" /></Button>
    <Button bsStyle={address ? "info": "default"} disabled={!address} onClick={() => formatExtraData(row, surveyType.ADDRESS)}><FontAwesomeIcon icon={faMapMarkedAlt} /></Button>
    {/* <Button bsStyle={temperature ? "info": "default"} disabled={!temperature} onClick={() => formatExtraData(row, surveyType.TEMPERATURE)}><FontAwesomeIcon icon={faTemperatureLow} /></Button> */}
  </ButtonGroup>;
};

MissionsList.propTypes = propTypes;
MissionsList.defaultProps = defaultProps;

export default MissionsList;
