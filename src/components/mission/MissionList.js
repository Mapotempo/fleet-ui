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
import { faMapMarkedAlt, faCoffee, faHome, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Label, Badge, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';

// other
import { SURVEY_TYPE, ETA_TYPE } from '../../constants';
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
  let delayLowThreashold = useSelector(state => state.fleet.config.delayLowThreashold);
  let delayHightThreashold = useSelector(state => state.fleet.config.delayHightThreashold);

  let missionStatusTypeMap = useSelector(missionStatusTypesMapper);

  const sortETA = (eta, mission) => {
    return props.route.extraInfo.missionDelayInfoMap[mission.id].arrivalDate;
  };

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
    dataField: 'date',
    text: t('mission.list_header.planned_time'),
    formatter: plannedTimeFormater,
    formatExtraData: { route: props.route,  delayLowThreashold, delayHightThreashold, t },
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    sort: true
  },
  {
    dataField: 'eta',
    text: t('mission.list_header.arrival_time'),
    formatter: etaTimeFormater,
    formatExtraData: { route: props.route,  delayLowThreashold, delayHightThreashold, t },
    classes: 'mission-list-column overflow',
    headerClasses: 'mission-list-column overflow',
    isDummyField: true,
    sort: true,
    sortValue: sortETA
  },
  {
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
  const selectIconFromType = (missionType) => {
    switch (missionType) {
      case "departure":
      case "arrival":
        return faHome;
      case "rest":
        return faCoffee;
      default:
        return faAddressCard;
    }
  };
  return (<p>
    <FontAwesomeIcon icon={selectIconFromType(mission.mission_type)} />
    &nbsp;&nbsp;
    <b>{name}</b><br />
    {mission.reference ? <Label>ref: {mission.reference}</Label> : null}
  </p>);
};

const MissionStatusFormater = (missionStatusTypeId, mission, rowIndex, missionStatusTypeMap) => {
  let status = missionStatusTypeMap[missionStatusTypeId];
  if (status)
    return (<Badge style={{ backgroundColor: status.color }}>{status.label}</Badge>);
  return missionStatusTypeId;
};

const plannedTimeFormater = (date, mission, rowIndex, { route, t }) => {
  let delayInfo = route.extraInfo.missionDelayInfoMap[mission.id];
  return (<div>
    <Label className='date' bsStyle='default' style={{ fontSize: '12px' }}>
      {toLocaleTimeString(new Date(date))}
    </Label>
    {delayInfo.plannedTimeWindow ? (
      <p style={{whiteSpace: "pre-line"}}>Plage {toLocaleTimeString(new Date(delayInfo.plannedTimeWindow.start))} - {toLocaleTimeString(new Date(delayInfo.plannedTimeWindow.end))}</p>)
      : null
    }
  </div>);
};

const etaTimeFormater = (eta, mission, rowIndex, { route, t, delayLowThreashold, delayHightThreashold }) => {
  const routeDate = new Date(route.date),
    delayInfo = route.extraInfo.missionDelayInfoMap[mission.id];
  const arrival = new Date(delayInfo.arrivalDate);

  if (delayInfo.delayType === ETA_TYPE.STA && delayInfo.delay === 0)
    return <Label className="eta" bsStyle='default' style={{ fontSize: '12px', fontWeight: null }}>--h--</Label>;

  let style = 'success';
  if (delayInfo.delay > delayHightThreashold)
    style = 'danger';
  else if (delayInfo.delay > delayLowThreashold)
    style = 'warning';
  const arrivalLabel = delayInfo.delayType === ETA_TYPE.RTA ? '' : `ETA`;
  return (
    <div>
      <Label className="eta" bsStyle={style} style={{ fontSize: '12px', fontWeight: null }}>
        {`${toLocaleTimeString(arrival)}${dayLabel(routeDate, arrival)}`}
      </Label>
      <Badge className="eta"
        title={t(`mission.eta_help_text.${delayInfo.delayType}`)}>
        {arrivalLabel}
      </Badge>
    </div>);
};

const AttachmentFormater = (cell, mission, rowIndex, formatExtraData) => {
  let picture = mission.survey_pictures && mission.survey_pictures.length > 0;
  let signature = mission.survey_signature;
  let comment = mission.survey_comment;
  let barcode = mission.survey_barcodes && mission.survey_barcodes.length > 0;
  let address = mission.survey_address;
  // let temperature = row.survey_temperature;
  return <ButtonGroup>
    <Button bsStyle={picture ? "info": "default"} disabled={!picture} onClick={() => formatExtraData(mission, SURVEY_TYPE.PICTURE)}><Glyphicon glyph="camera" /></Button>
    <Button bsStyle={signature ? "info": "default"} disabled={!signature} onClick={() => formatExtraData(mission, SURVEY_TYPE.SIGNATURE)}><Glyphicon glyph="pencil" /></Button>
    <Button bsStyle={comment ? "info": "default"} disabled={!comment} onClick={() => formatExtraData(mission, SURVEY_TYPE.COMMENT)}><Glyphicon glyph="comment" /></Button>
    <Button bsStyle={barcode ? "info": "default"} disabled={!barcode} onClick={() => formatExtraData(mission, SURVEY_TYPE.BARCODE)}><Glyphicon glyph="barcode" /></Button>
    <Button bsStyle={address ? "info": "default"} disabled={!address} onClick={() => formatExtraData(mission, SURVEY_TYPE.ADDRESS)}><FontAwesomeIcon icon={faMapMarkedAlt} /></Button>
    {/* <Button bsStyle={temperature ? "info": "default"} disabled={!temperature} onClick={() => formatExtraData(row, SURVEY_TYPE.TEMPERATURE)}><FontAwesomeIcon icon={faTemperatureLow} /></Button> */}
  </ButtonGroup>;
};

MissionList.propTypes = propTypes;
MissionList.defaultProps = defaultProps;

export default MissionList;
