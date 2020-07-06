export const SURVEY_TYPE = {
  PICTURE: 'picture',
  SIGNATURE: 'signature',
  COMMENT: 'comment',
  BARCODE: 'barcode',
  ADDRESS: 'address',
  TEMPERATURE: 'temperature'
};

export const ETA_TYPE = {
  RTA: 'real_time_arrival',
  STA: 'shifted_time_arrival',
  CTA: 'computed_time_arrival'
};

Object.freeze(SURVEY_TYPE);
Object.freeze(ETA_TYPE);
