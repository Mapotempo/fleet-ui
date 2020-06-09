// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Reselect
import { usersMapper } from '../../selectors';

// Component
import { Grid, Col, Media, Row, Panel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAt, faUser, faMobile } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-bootstrap-toggle';

const Entry = (props) => {
  let { icon, title, content } = props;
  return (
    <React.Fragment>
      <Media>
        {icon ? <Media.Left align="middle">
          {<FontAwesomeIcon color="grey  " size="1x" icon={icon} />}
        </Media.Left> : null}
        <Media.Body>
          <div className="mtf-user-info-entry-title">
            {title}
          </div>
          <div className="mtf-user-info-entry-content">
            {content}
          </div>
        </Media.Body>
      </Media>
    </React.Fragment>
  );
};

Entry.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.any
};

const SettingToggle = (props) => {
  const { t } = useTranslation();
  return (<Toggle size="sm" on={t("user_info.application_settings.toggle_on")}
    off={t("user_info.application_settings.toggle_off")}
    offstyle="default"
    data-size="mini"
    active={props.active}
    disabled />
  );
};

SettingToggle.propTypes = {
  active: PropTypes.bool.isRequired
};

const UserInfoTitle = (props) => {
  return (
    <h4>
      {props.text}
      <div className="mtf-user-info-v-separator"/>
    </h4>
  );
};

UserInfoTitle.propTypes = {
  text: PropTypes.string.isRequired
};

const DeviceInfoPanel = (props) => {
  let userInfo = props.userInfo;
  const { t } = useTranslation();
  return (
    <Panel className="mtf-user-info-device">
      <Entry title={t("user_info.devices_informations.device_id")} content={userInfo.device_info.device_id} />
      <Entry title={t("user_info.devices_informations.device_os")} content={`${userInfo.device_info.os}-${userInfo.device_info.os_version}`} />
      <Entry title={t("user_info.devices_informations.device_model")} content={userInfo.device_info.model} />
      <Entry title={t("user_info.devices_informations.last_update")} content={userInfo.date} />
      <Entry title={t("user_info.devices_informations.last_connection")} content={userInfo.last_sign_in_at} />
      <Entry title={t("user_info.devices_informations.app_version")} content={userInfo.current_app_version} />
      <Entry title={t("user_info.devices_informations.lib_version")} content={userInfo.current_lib_version} />
      <Entry title={t("user_info.devices_informations.connection_type")} content={userInfo.current_sign_in_connexion_type} />
    </Panel>
  );
};

DeviceInfoPanel.propTypes = {
  userInfo: PropTypes.object.isRequired
};

const UserInfos = (props) => {
  const { t } = useTranslation();
  let usersMap = useSelector(usersMapper);
  let user = usersMap[props.userId];
  return (
    <div>
      <Grid fluid>
        <Row className="show-grid">
          <Col md={5}>
            <UserInfoTitle text={t("user_info.driver.title")} />
            <Entry icon={faUser} title={t("user_info.driver.name")} content={user.name} />
            <Entry icon={faAt} title={t("user_info.driver.email")} content={user.email} />
            <Entry icon={faPhone} title={t("user_info.driver.phone")} content={user.phone} />
            <UserInfoTitle text={t("user_info.application_settings.title")} />
            {user.user_settings ? (
              <React.Fragment>
                <Entry
                  title={t("user_info.application_settings.mobile_data")}
                  content={<SettingToggle active={user.user_settings.data_connection} disabled />}
                />
                <Entry
                  title={t("user_info.application_settings.geoloc_tracking")}
                  content={<SettingToggle active={user.user_settings.tracking_enable} disabled />}
                />
                <Entry
                  title={t("user_info.application_settings.automatic_next_mission")}
                  content={<SettingToggle active={user.user_settings.automatic_archive} disabled />}
                />
                <Entry
                  title={t("user_info.application_settings.automatic_archiving")}
                  content={<SettingToggle active={user.user_settings.use_shortcut_next_mission} disabled />}
                /></React.Fragment>)
              :
              (<p>{t("user_info.application_settings.settings_information_missing")}</p>)
            }
          </Col>
          <Col md={7}>
            <UserInfoTitle text={t("user_info.devices_informations.title")} />
            <Entry icon={faMobile} title={t("user_info.devices_informations.current_connection", {count: user.user_infos.length})} content={user.user_infos.length} />
            <div className="mtf-user-info-devices-container">
              {user.user_infos.map(userInfo => (<DeviceInfoPanel key={userInfo.id} userInfo={userInfo} />))}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

UserInfos.propTypes = {
  userId: PropTypes.string.isRequired
};

export {
  UserInfos
};
