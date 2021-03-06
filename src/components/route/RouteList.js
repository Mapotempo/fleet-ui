// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Reselect
import { missionStatusTypesMapper } from '../../selectors';
import { usersMapper } from '../../selectors';

// Component
import GenericTable from '../utils/table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ProgressBar, Label, Badge, ButtonGroup, Button, Glyphicon, Grid, Col, Row } from 'react-bootstrap';
import { Title } from '../utils/title';
import { UserInfos, UserSettings, DeviceInfos } from '../user/UserInfos';
import RouteInfos from './RouteInfos';

// ==========
// ROUTE LIST
// ==========

const propTypes = {
  routes: PropTypes.array,
  onRouteSelected: PropTypes.func
};

const defaultProps = {
  routes: [],
  onRouteSelected: () => {}
};

const RoutesList = (props) => {
  const { t } = useTranslation();
  const [wideScreen, setWideScreen] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState(undefined);
  let usersMap = useSelector(usersMapper);

  const expandOneRow = (routeId) => {
    setExpandedRowId(routeId === expandedRowId ? undefined : routeId);
  };

  useEffect(() => {
    const reportWindowSize = () => {
      if (wideScreen != window.innerWidth < 767)
        setWideScreen(true);
      else if (wideScreen != window.innerWidth > 767)
        setWideScreen(false);
    };
    reportWindowSize();
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  const widthStyleGenerator = width => {
    return {
      style: {width: `${width}%`},
      headerStyle: {width: `${width}%`},
      editCellStyle: {width: `${width}%`},
      editorStyle: {width: `${width}%`}
    };
  };

  const columnsBase = [
    {
      dataField: 'extraInfo.eta',
      text: t('route.list_header.delay_planned'),
      headerAlign: 'center',
      align: 'center',
      formatter: ETAFormatter,
      classes: 'route-list-column',
      headerClasses: 'route-list-column',
      ...widthStyleGenerator(6)
    },
    {
      dataField: 'name',
      text: t('route.list_header.name'),
      title: true,
      formatter: nameFormatter,
      formatExtraData: expandOneRow,
      classes: 'route-list-column overflow row-expand',
      headerClasses: 'route-list-column',
      sort: true,
      ...widthStyleGenerator(25)
    },
    {
      dataField: 'user_email',
      isDummyField: true,
      text: t('route.list_header.email'),
      formatter: userEmailFormatter,
      formatExtraData: usersMap,
      classes: 'route-list-column overflow',
      headerClasses: 'route-list-column',
      wideScreenOnly: true,
      sort: true,
      ...widthStyleGenerator(25)
    },
    {
      dataField: 'routeInfoDeparture',
      isDummyField: true,
      text: t('route.list_header.departure'),
      formatter: statusFormatter,
      formatExtraData: 'departure',
      headerAlign: 'center',
      align: 'center',
      classes: 'route-list-column',
      headerClasses: 'route-list-column'
    },
    {
      dataField: 'routeInfoMission',
      isDummyField: true,
      text: t('route.list_header.missions'),
      formatter: missionStatusFormatter,
      formatExtraData: 'mission',
      headerAlign: 'center',
      align: 'center',
      classes: 'route-list-column',
      headerClasses: 'route-list-column'
    }, {
      dataField: 'routeInfoRest',
      isDummyField: true,
      text: t('route.list_header.rests'),
      formatter: statusFormatter,
      formatExtraData: 'rest',
      headerAlign: 'center',
      align: 'center',
      classes: 'route-list-column',
      headerClasses: 'route-list-column'
    },
    {
      dataField: 'routeInfoArrival',
      isDummyField: true,
      text: t('route.list_header.arrivals'),
      formatter: statusFormatter,
      formatExtraData: 'arrival',
      headerAlign: 'center',
      align: 'center',
      classes: 'route-list-column',
      headerClasses: 'route-list-column'
    },
    {
      dataField: 'extraInfo.progress',
      text: t('route.list_header.progress'),
      formatter: advancementFormatter,
      classes: 'route-list-column',
      headerClasses: 'route-list-column overflow',
      wideScreenOnly: true
    },
    {
      dataField: 'routeAction',
      isDummyField: true,
      text: '',
      formatter: actionFormatter,
      formatExtraData: props.onRouteSelected,
      classes: 'route-list-column',
      headerClasses: 'route-list-column'
    }
  ];

  let columns = columnsBase.filter((item) => !item.wideScreenOnly || item.wideScreenOnly == wideScreen);

  return (
    <div className="route-list">
      <GenericTable
        wrapperClasses="route-table-wrapper"
        rowClasses="route-table-row"
        keyField='id'
        data={props.routes}
        columns={columns}
        hover={false}
        striped
        bordered={false}
        pagination={ paginationFactory() }
        noDataIndication="No Route found"
        expandRow={{
          expanded: expandedRowId ?  [expandedRowId] : [],
          expandByColumnOnly: true,
          renderer: expandFormater
        }} />
    </div>);
};

RoutesList.propTypes = propTypes;
RoutesList.defaultProps = defaultProps;

export default RoutesList;

// ========
// Formater
// ========
const nameFormatter = (cell, row, rowIndex, expandOneRow) => {
  return <a onClick={()=>expandOneRow(row.id)}>{ cell }</a>;
};

const userEmailFormatter = (cell, row, rowIndex, formatExtraData) => {
  return formatExtraData[row.user_id].email;
};

const statusFormatter = (cell, row, rowIndex, formatExtraData) => (<RouteStatusColors route={row} type={formatExtraData} withLabels withCount={false} />);

const missionStatusFormatter = (cell, row, rowIndex, formatExtraData) => (<RouteStatusColors route={row} type={formatExtraData}/>);

const advancementFormatter = cell => (<ProgressBar style={{ margin: 0 }} now={cell} label={`${cell}%`} title={`${cell}%`} />);

const ETAFormatter = (cell, row) => {
  let delay = row.extraInfo.finishedMissionsDelay.overLowThreashold + row.extraInfo.finishedMissionsDelay.overHightThreashold;
  let delayPlanned = row.extraInfo.plannedMissionsDelay.overLowThreashold + row.extraInfo.plannedMissionsDelay.overHightThreashold;
  let style = 'default';
  if (row.missions.length > 0) {
    let ratio = (delay + delayPlanned) / row.missions.length;
    if (ratio > 0.2)
      style = 'warning';
    if (ratio > 0.5)
      style = 'danger';
  }
  return <Label bsStyle={style} style={{ display: 'block', width: '100%' }}>{delay} - {delayPlanned}</Label>;
};

const actionFormatter = (cell, row, rowIndex, formatExtraData) => {
  return (<ButtonGroup justified>
    <ButtonActionWrapper onClick={() => formatExtraData(row.id)} href="#"
      titleTag="route.actions.help_text.details"><Glyphicon glyph="list" /></ButtonActionWrapper>
  </ButtonGroup>);
};

// ==========
// Components
// ==========

const RouteStatusColors = ({route, type='mission', withCount=true, withLabels=false}) => {
  let missionStatusTypesMap = useSelector(missionStatusTypesMapper);
  return Object.entries(route.extraInfo[type].statusCounter).reduce((accumulator, [missionStatusTypeId, value]) => {
    let missionStatusType = missionStatusTypesMap[missionStatusTypeId];
    if (!missionStatusType) {
      console.warn('MissionStatusTypeId not found', missionStatusType);
      return accumulator;
    }
    accumulator.push(
      <Badge key={missionStatusType.color} style={{ backgroundColor: missionStatusType.color }}>
        {(withCount ? value : "") + (withLabels && withCount ? " - " : "") + (withLabels ? missionStatusType.label : "")}
      </Badge>);
    accumulator.push(" ");
    return accumulator;
  }, []);
};

const ButtonActionWrapper =   props => {
  const { t } = useTranslation();
  let {titleTag, ...rest} = props;
  return <Button {...rest} title={t(titleTag)} />;
};

ButtonActionWrapper.propTypes = { titleTag: PropTypes.string.isRequired };

// =========
// ExpandRow
// =========

const ExpandRowComponent = (props) => {
  const { t } = useTranslation();
  return (
    <Grid fluid>
      <Row className="show-grid">
        <Col md={5}>
          <div className="route-expand-row-element">
            <Title text={t("route.route_info.further_information")} />
            <RouteInfos route={props.route} />
          </div>
          <div className="route-expand-row-element">
            <Title text={t("user_info.driver.title")} />
            <UserInfos userId={props.userId} />
          </div>
          <div className="route-expand-row-element">
            <Title text={t("user_info.application_settings.title")} />
            <UserSettings userId={props.userId} />
          </div>
        </Col>
        <Col md={7}>
          <div className="route-expand-row-element">
            <Title text={t("user_info.devices_informations.title")} />
            <DeviceInfos userId={props.userId} />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

ExpandRowComponent.propTypes = {
  route: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};

const expandFormater = row => <ExpandRowComponent route={row} userId={row.user_id}></ExpandRowComponent>;


