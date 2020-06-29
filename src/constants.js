export const surveyType = {
  PICTURE: 'picture',
  SIGNATURE: 'signature',
  COMMENT: 'comment',
  BARCODE: 'barcode',
  ADDRESS: 'address',
  TEMPERATURE: 'temperature'
};

export const computedDelayType = {
  RTA: 'real_time_arrival',
  STA: 'shifted_time_arrival',
  ETA: 'estimated_time_arrival'
};

Object.freeze(surveyType);
