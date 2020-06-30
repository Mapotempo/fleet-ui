const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const dayLabel = (a, b) => {
  let dayDiff = dateDiffInDays(a, b);
  if (dayDiff !== 0)
    return ` (J${dayDiff<0?'':'+'}${dayDiff})`;
  return '';
};


export const toLocaleTimeString = (a) => {
  return `${a.getHours().toString().padStart(2, '0')}h${a.getMinutes().toString().padStart(2, '0')}`;
};
