// React
import React from 'react';
import PropTypes from 'prop-types';

// React
import { missionStatusTypesMapper } from '../../selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Component
import GenericTable from '../utils/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Label, Badge, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

// other
import { surveyType, ETA_TYPE } from '../../constants';
import { toLocaleTimeString, dayLabel } from '../../lib/dateUtils';

// =============
// MISSIONS LIST
// =============

const propTypes = {
  route: PropTypes.object.isRequired,
  // missions: PropTypes.array,
  onMissionSurveyClick: PropTypes.func
};

const defaultProps = {
  onMissionSurveyClick: () => {}
};

const MissionList = props => {
  const { t } = useTranslation();
  let missionStatusTypeMap = useSelector(missionStatusTypesMapper);

  const columns = [{
    dataField: 'name',
    text: t('mission.list_header.name'),
    formatter: NameFormater,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    sort: true
  }, {
    dataField: 'mission_status_type_id',
    text: t('mission.list_header.status'),
    formatter: MissionStatusFormater,
    formatExtraData: missionStatusTypeMap,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    sort: true
  },{
    dataField: 'mission_type',
    text: t('mission.list_header.mission_type'),
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    sort: true
  },{
    dataField: 'date',
    text: t('mission.list_header.arrival_time'),
    formatter: TimeFormater,
    formatExtraData: props.route,
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    sort: true
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

  const defaultSorted = [{
    dataField: 'date',
    order: 'asc'
  }];

  return <GenericTable
    classes="mission-list"
    wrapperClasses='mission-table-wrapper'
    keyField='id'
    striped
    defaultSorted={defaultSorted}
    data={props.route.missions}
    columns={columns}
    hover
    bordered={ false }
    noDataIndication="No Mission found"
  />;
};

// ========
// Formater
// prototype: (cell, row, rowIndex, formatExtraData) => { ... }
// ========

const NameFormater = (name, mission) => {
  return (
    <div>
      <b>{name}</b><br />
      {mission.reference ? <Label>ref: {mission.reference}</Label> : null}
    </div>);
};

const MissionStatusFormater = (missionStatusTypeId, mission, rowIndex, missionStatusTypeMap) => {
  let status = missionStatusTypeMap[missionStatusTypeId];
  if (status)
    return (<Badge style={{ backgroundColor: status.color }}>{status.label}</Badge>);
  return missionStatusTypeId;
};

const TimeFormater = (date, mission, rowIndex, route) => {
  let routeDate = new Date(route.date),
    planned = new Date(date),
    delayInfo = route.extraInfo.missionDelayInfoMap[mission.id];
  return (<TimeComponent
    routeDate={routeDate}
    planned={planned}
    delayInfo={delayInfo} />);
};

const AttachmentFormater = (cell, mission, rowIndex, formatExtraData) => {
  let picture = mission.survey_pictures && mission.survey_pictures.length > 0;
  let signature = mission.survey_signature;
  let comment = mission.survey_comment;
  let barcode = mission.survey_barcodes && mission.survey_barcodes.length > 0;
  let address = mission.survey_address;
  // let temperature = row.survey_temperature;
  return <ButtonGroup>
    <Button bsStyle={picture ? "info": "default"} disabled={!picture} onClick={() => formatExtraData(mission, surveyType.PICTURE)}><Glyphicon glyph="camera" /></Button>
    <Button bsStyle={signature ? "info": "default"} disabled={!signature} onClick={() => formatExtraData(mission, surveyType.SIGNATURE)}><Glyphicon glyph="pencil" /></Button>
    <Button bsStyle={comment ? "info": "default"} disabled={!comment} onClick={() => formatExtraData(mission, surveyType.COMMENT)}><Glyphicon glyph="comment" /></Button>
    <Button bsStyle={barcode ? "info": "default"} disabled={!barcode} onClick={() => formatExtraData(mission, surveyType.BARCODE)}><Glyphicon glyph="barcode" /></Button>
    <Button bsStyle={address ? "info": "default"} disabled={!address} onClick={() => formatExtraData(mission, surveyType.ADDRESS)}><FontAwesomeIcon icon={faMapMarkedAlt} /></Button>
    {/* <Button bsStyle={temperature ? "info": "default"} disabled={!temperature} onClick={() => formatExtraData(row, surveyType.TEMPERATURE)}><FontAwesomeIcon icon={faTemperatureLow} /></Button> */}
  </ButtonGroup>;
};

// ==========
// Components
// ==========

const TimeComponent = ({ routeDate, planned, delayInfo }) => {
  const { t } = useTranslation();
  let delayLowThreashold = useSelector(state => state.fleet.config.delayLowThreashold);
  let delayHightThreashold = useSelector(state => state.fleet.config.delayHightThreashold);
  let arrival = new Date(delayInfo.arrivalDate);
  let style = 'success';
  if (delayInfo.delay > delayHightThreashold)
    style = 'danger';
  else if (delayInfo.delay > delayLowThreashold)
    style = 'warning';

  let arrivalLabel = delayInfo.delayType === ETA_TYPE.RTA ? '' : `ETA`;

  return (
    <div>
      <Label bsStyle={style} style={{ fontSize: '0.87em' }}>
        {`${toLocaleTimeString(planned)}${dayLabel(routeDate, planned)} / ${toLocaleTimeString(arrival)}${dayLabel(routeDate, arrival)}`}
      </Label>
      <Badge style={{
        background: '#989898',
        display: 'inline-block',
        position: 'relative',
        left: '-10px',
        top: '-10px',
        fontSize: '0.6em'
      }} title={t(`mission.eta_help_text.${delayInfo.delayType}`)}>
        {arrivalLabel}
      </Badge>
    </div>);
};

TimeComponent.propTypes = {
  routeDate: PropTypes.instanceOf(Date).isRequired,
  planned: PropTypes.instanceOf(Date).isRequired,
  delayInfo: PropTypes.object.isRequired
};


MissionList.propTypes = propTypes;
MissionList.defaultProps = defaultProps;

export default MissionList;
