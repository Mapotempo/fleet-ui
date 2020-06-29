

export default (configState) => {
  const initState = {
    host: 'http://localhost:3000/',
    locale: 'en',
    delayLowThreashold: 5 * 60, // seconds
    delayHightThreashold: 30 * 60, // seconds
    ...configState
  };

  return (state = initState) => {
    return state;
  };
};
