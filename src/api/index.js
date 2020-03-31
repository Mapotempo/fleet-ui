export { default as ApiAuth }  from './ApiAuth';
export { default as ApiUsers }  from './ApiUsers';
export { default as ApiRoutes }  from './ApiRoutes';
export { default as ApiWorkflow } from './ApiWorkflow';

import initMock from './ApiMock';
import { generateFakeData } from './fake/fakeData';

if (process.env.REACT_APP_USE_FAKER === 'true') {
  initMock(generateFakeData());
}
