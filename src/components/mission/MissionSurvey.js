// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useState } from 'react';

// Component
import { Image, Form, FormGroup, Col, FormControl, ControlLabel, Carousel } from 'react-bootstrap';

// Constant
import { SURVEY_TYPE } from '../../constants';

// =============
// SurveyPicture
// =============

const surveyPicturePropTypes = {
  mission: PropTypes.object.isRequired
};

const SurveyPicture = (props) => {
  let images = props.mission.survey_pictures.map((image, index) => <Carousel.Item key={index}><Image src={image} responsive className="survey-image"/></Carousel.Item>);
  return (
    <React.Fragment>
      <Carousel>
        {images}
      </Carousel>
    </React.Fragment>);
};

SurveyPicture.propTypes = surveyPicturePropTypes;

// ===============
// SurveySignature
// ===============

const surveySignaturePropTypes = {
  mission: PropTypes.object.isRequired
};

const SurveySignature = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <React.Fragment>
      {isLoading ? '...' : null }
      <Image onLoad={() => setIsLoading(false)} src={props.mission.survey_signature} responsive className="survey-image"/>
    </React.Fragment>);
};

SurveySignature.propTypes = surveySignaturePropTypes;

// =============
// SurveyComment
// =============

const surveyCommentPropTypes = {
  mission: PropTypes.object.isRequired
};

const SurveyComment = (props) => {
  return (
    <p>
      {props.mission.survey_comment}
    </p>
  );
};

SurveyComment.propTypes = surveyCommentPropTypes;

// =============
// SurveyBarCode
// =============

const surveyBarCodePropTypes = {
  mission: PropTypes.object.isRequired
};

const SurveyBarCode = (props) => {
  return props.mission.survey_barcodes.map((id, index) => {return <div key={index}>{id}</div>;});
};

SurveyBarCode.propTypes = surveyBarCodePropTypes;

// =============
// SurveyAddress
// =============

const surveyAddressPropTypes = {
  mission: PropTypes.object.isRequired
};

const SurveyAddress = (props) => {
  let address = {
    city: "",
    country: "",
    detail: "",
    postalcode: "",
    state: "",
    street: "",
    ...props.mission.survey_address
  };
  return (
    <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} xs={3}>Voie</Col>
        <Col xs={9}>
          <FormControl disabled type="input" value={address.street}/>
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} xs={3}>Complément</Col>
        <Col xs={9}>
          <FormControl disabled type="complement" value={address.detail}/>
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} xs={3}>Code postal</Col>
        <Col xs={9}>
          <FormControl disabled type="complement" value={address.postalcode}/>
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} xs={3}>Ville</Col>
        <Col xs={9}>
          <FormControl disabled type="complement" value={address.city}/>
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} xs={3}>Pays</Col>
        <Col xs={9}>
          <FormControl disabled type="complement" value={address.country}/>
        </Col>
      </FormGroup>
    </Form>
  );
};


SurveyAddress.propTypes = surveyAddressPropTypes;

// ===========
// SurveyError
// ===========

const surveyErrorPropTypes = {
  msg: PropTypes.string.isRequired
};

const SurveyError = (props) => {
  return (
    <div>{props.msg}</div>);
};

SurveyError.propTypes = surveyErrorPropTypes;

// =============
// MissionSurvey
// =============

const missionSurveyPropTypes = {
  mission: PropTypes.object.isRequired,
  surveyType: PropTypes.oneOf(Object.values(SURVEY_TYPE)).isRequired
};

const MissionSurvey = (props) => {
  switch (props.surveyType)
  {
    case SURVEY_TYPE.SIGNATURE:
      return <SurveySignature mission={props.mission}/>;
    case SURVEY_TYPE.PICTURE:
      return <SurveyPicture mission={props.mission}/>;
    case SURVEY_TYPE.COMMENT:
      return <SurveyComment mission={props.mission}/>;
    case SURVEY_TYPE.BARCODE:
      return <SurveyBarCode mission={props.mission}/>;
    case SURVEY_TYPE.ADDRESS:
      return <SurveyAddress mission={props.mission}/>;
    default:
      return (<SurveyError msg={`survey type "${props.surveyType}" not yet implemented`}/>);
  }
};

MissionSurvey.propTypes = missionSurveyPropTypes;

export default MissionSurvey;
