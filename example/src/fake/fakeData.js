
import { generateCompanyData } from './fakeCompany';

export const generateFakeData = () => { return {
  "abcdef123456": generateCompanyData('company-abcdef', 'jm.fillau@gmail.com', 'abcdef123456'),
  "abcdef654321": generateCompanyData('company-dk789', 'jean-maxime@mapotempo.com', 'abcdef654321'),
  "nbvcxxw": generateCompanyData('company-abcdef', 'm.fillau@laposte.net', 'nbvcxxw'),
};};
