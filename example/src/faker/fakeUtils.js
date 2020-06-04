export const computeDuration = (missions) => {
  if (missions.length > 0) // we presupposed missions are ordered by day
  {
    return (new Date(missions[missions.length - 1].date) - new Date(missions[0].date)) / 1000;
  }
  return 0;
};

export const generateMissionStatusTypeLastDate = (missionDate, statusRef) => {
  return statusRef.includes('to_do') ? undefined : dateToLocalISO(new Date(missionDate.getTime() + getRandomInt(-15 * 60 * 1000, 15 * 60 * 1000)));
};


export const dateToLocalISO = (date) => {
  const off    = date.getTimezoneOffset();
  const absoff = Math.abs(off);
  return (new Date(date.getTime() - off*60*1000).toISOString().substr(0,23) +
          (off > 0 ? '-' : '+') +
          (absoff / 60).toFixed(0).padStart(2,'0') + ':' +
          (absoff % 60).toString().padStart(2,'0'));
};


export const lastify = (isLast, threashold) => {
  if (!isLast)
    return false;
  return Math.floor(Math.random() * 100) > threashold ? false : true;
};

export const getRandomStatus = (missionStatusTypes, isLast, isInProgress) => {
  missionStatusTypes = missionStatusTypes.filter(missionStatusType =>(missionStatusType.is_last || false) === isLast);
  if (!isLast)
    missionStatusTypes = missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes('in_progress') === isInProgress);
  return missionStatusTypes[Math.floor(Math.random() * missionStatusTypes.length)];
};

export const getRandomUUID = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};


// TODO:
// const generateTimeWindows = (missionDate, missionType) => {
//   if (missionType !== 'mission')
//     return [];
//   let timeWindow  = new Date(missionDate);
//   timeWindow.setMilliseconds(0);
//   timeWindow.setSeconds(0);
//   timeWindow.setMinutes(0);
//   const windows = [15,30,60];
//   let randWindows = windows[Math.floor(Math.random() * windows.length)];
//   return [
//     {
//       start: dateToLocalISO(new Date(timeWindow.getTime() - randWindows * 60 * 1000)),
//       end: dateToLocalISO(new Date(timeWindow.getTime() + randWindows * 60 * 1000)),
//     }
//   ];
// };
