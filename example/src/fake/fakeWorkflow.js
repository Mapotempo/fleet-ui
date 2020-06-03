import { getRandomUUID } from './fakeUtils';

export const generateMissionStatusType = (companyId) => {
  return [
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_undone',
      color: '#D9534F',
      label: 'Non fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_undone',
      color: '#D9534F',
      label: 'Non fait',
      is_last: true
    }
  ];
};

export const generateMissionActionsType = (companyId) => {
  return [
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298YwfgND',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YwfgND',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    }
  ];
};
