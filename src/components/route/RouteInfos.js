// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useTranslation } from 'react-i18next';

// Component
import { Entry } from '../utils/entry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faCalendarPlus, faArchive, faClock, faRoad } from '@fortawesome/free-solid-svg-icons';

const RouteInfos = (props) => {
  const { t, i18n } = useTranslation();
  return (<React.Fragment>
    <Entry
      icon={<FontAwesomeIcon fixedWidth color="grey  " size="1x" icon={faCalendarPlus} />}
      title={t("route.route_info.created_at")}
      content={new Date(props.route.created_at).toLocaleString(i18n.language)}
      contentHelp={t("route.route_info.planned_version", {version: props.route.planned_version})}/>
    <Entry
      icon={<FontAwesomeIcon fixedWidth color="grey  " size="1x" icon={faClock} />}
      title={t("route.route_info.planned_duration")}
      content={`${Math.floor(props.route.duration / 3600)}h${Math.floor((props.route.duration % 3600) / 60)}m`} />
    <Entry
      icon={<FontAwesomeIcon fixedWidth color="grey  " size="1x" icon={faRoad} />}
      title={t("route.route_info.planned_distance")}
      content={`${(props.route.distance/1000).toFixed(1)}km`} />
    <Entry
      icon={<FontAwesomeIcon fixedWidth color="grey  " size="1x" icon={faHourglassEnd} />}
      title={t("route.route_info.expire_at")}
      content={new Date(props.route.expire_at).toLocaleDateString(i18n.language)} />
    <Entry
      icon={<FontAwesomeIcon fixedWidth color="grey  " size="1x" icon={faArchive} />}
      title={t("route.route_info.archiving_status")} content={
        props.route.archived_at ?
          t("route.route_info.archived_by_xx_on_date", {
            date: new Date(props.route.archived_at).toLocaleString(i18n.language), id: props.route.archived_by || "----"
          }) : "-"} />
  </React.Fragment>);
};

RouteInfos.propTypes = {
  route: PropTypes.object.isRequired
};

export default RouteInfos;
