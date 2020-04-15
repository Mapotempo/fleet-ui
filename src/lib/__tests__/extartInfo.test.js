import {computeMissionDelay, computeExtraInfo} from "../extraInfo.js";

describe('Lib - extraInfo', function() {

  describe('#computeMissionDelay()', function() {
    var missionTemplate = {};
    beforeEach(() => { // Reset temscheduledArrivalplate
      missionTemplate = {
        date: '2020-03-18T10:30:00.000+01:00',
        mission_status_type_last_date: undefined,
        eta: undefined,
        time_windows: []
      };
    });

    it('should return delay when no timeWindows', function() {
      expect(computeMissionDelay({...missionTemplate,
        eta: '2020-03-18T11:30:00.000+01:00'}, {is_last: false}))
        .toBe(3600);
      expect(computeMissionDelay({...missionTemplate,
        mission_status_type_last_date: '2020-03-18T11:30:00.000+01:00'}, {is_last: true}))
        .toBe(3600);
    });

    it('should return 0 when planned timeWindows not found', function() {
      expect(computeMissionDelay({...missionTemplate,
        eta: '2020-03-18T11:30:00.000+01:00',
        time_windows: [{start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}]}, {is_last: false}))
        .toBe(0);
    });

    it('should return positive when timewindow exist and ETA > end and is_last = undefined', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined}))
        .toBeGreaterThan(0);
    });

    it('should return negative when timewindow exist and ETA < start and is_last = undefined', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T09:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined}))
        .toBeLessThan(0);
    });

    it('should use Eta to compute delay when mission_status_type_last_date exist and is_last = undefined', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T08:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined}))
        .toBeLessThan(0);
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T08:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined}))
        .toBeGreaterThan(0);
    });

    it('should return 0 when timewindow exist and ETA > end and is_last = true and mission_status_type_last_date = undefined', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true}))
        .toBe(0);
    });

    it('should return 0 when timewindow exist and ETA < start and is_last = true and mission_status_type_last_date = undefined', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T09:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true}))
        .toBe(0);
    });

    it('should use mission_status_type_last_date to compute delay when mission_status_type_last_date exist and is_last = True', function() {
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T08:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true}))
        .toBeGreaterThan(0);
      expect(computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T08:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true}))
        .toBeLessThan(0);
    });
  });

  describe('#computeExtraInfo()', function() {
    const route = {
      "id": 'route-abcdef',
      "external_ref": 'mapoweb-ext-ref',
      "name": 'mapotempo driver',
      "user_id": 'user-abcdef',
      "user_email": 'test1@mapotempo.com',
      "sync_user": 'c1e38fd06a2afc0414b551d4ed79e00d508fd9a456e2158eb44a5d6dd95e704c',
      "duration": 0,
      "distance": 0,
      "missions_count": 0,
      "missions": [{
        "date": '2020-03-18T12:30:00.000+01:00',
        "eta": '2020-03-18T11:30:00.000+01:00',
        "mission_status_type_id": 'mission_status_type_id_mission_done',
        "mission_type": 'mission'
      },
      {
        "date": '2020-03-18T11:30:00.000+01:00',
        "eta": '2020-03-18T11:35:00.000+01:00',
        "mission_status_type_id": 'mission_status_type_id_mission_undone',
        "mission_type": 'mission'
      },
      {
        "date": '2020-03-18T13:30:00.000+01:00',
        "eta": '2020-03-18T13:30:00.000+01:00',
        "mission_status_type_id": 'mission_status_type_id_mission_doing',
        "mission_type": 'mission'
      },
      {
        "date": '2020-03-18T13:30:00.000+01:00',
        "eta": '2020-03-18T13:30:00.000+01:00',
        "mission_status_type_id": 'mission_status_type_id_rest_todo',
        "mission_type": 'rest'
      },
      {
        "date": '2020-03-18T14:30:00.000+01:00',
        "mission_status_type_id": 'mission_status_type_arrival_todo',
        "mission_type": 'arrival'
      }]
    };

    const statutTypeMap = {
      // Mission Statuses
      "mission_status_type_id_mission_todo": {
        "is_last": false,
        "reference": 'todo'
      },
      "mission_status_type_id_mission_doing": {
        "is_last": false,
        "reference": 'doing'
      },
      "mission_status_type_id_mission_done": {
        "is_last": true,
        "reference": 'done'
      },
      "mission_status_type_id_mission_undone": {
        "is_last": true,
        "reference": 'undone'
      },
      // Rest Statuses
      "mission_status_type_id_rest_todo": {
        "is_last": false,
        "reference": 'todo'
      },
      "mission_status_type_id_rest_done": {
        "is_last": true,
        "reference": 'done'
      },
      // Arrival Statuses
      "mission_status_type_arrival_todo": {
        "is_last": false,
        "reference": 'todo'
      },
      "mission_status_type_arrival_done": {
        "is_last": true,
        "reference": 'todo'
      }
    };
    it('should use mission_status_type_last_date to compute delay when mission_status_type_last_date exist and is_last = True', function() {
      let extraInfo = computeExtraInfo(route, statutTypeMap);
      const res = {
        progress: 40,
        routeArrivalDate: '2020-03-18T14:30:00.000+01:00',
        routeArrivalETA: '2020-03-18T13:30:00.000+01:00',
        finishedMissions: 2,
        finishedMissionsUndone: 1,
        finishedMissionsDelay: { overLowThreashold: 0, overHightThreashold: 0 },
        plannedMissionsDelay: { overLowThreashold: 0, overHightThreashold: 0 },
        mission: {
          statusCounter: {
            mission_status_type_id_mission_done: 1,
            mission_status_type_id_mission_undone: 1,
            mission_status_type_id_mission_doing: 1
          },
          count: 3,
          done: 0
        },
        rest: {
          statusCounter: { mission_status_type_id_rest_todo: 1 },
          count: 1,
          done: 0
        },
        departure: { statusCounter: {}, count: 0, done: 0 },
        arrival: {
          statusCounter: { mission_status_type_arrival_todo: 1 },
          count: 1,
          done: 0
        }
      };
      expect(extraInfo).toStrictEqual(res);
    });
  });
});



