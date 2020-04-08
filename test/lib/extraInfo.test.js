var should = require('should');

var rewire = require("rewire");

const extraInfoModule = rewire("../../src/lib/extraInfo.js");

describe('Lib - extraInfo', function() {
  describe('#delayDateTimeWindow()', function() {
    const delayDateTimeWindow = extraInfoModule.__get__('delayDateTimeWindow');
    it('should be 0 when date is in time window', function() {
      should.equal(
        delayDateTimeWindow('2020-03-18T09:30:00.000+01:00', {start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}),
        0);
    });
    it('should be negative when date is below time window', function() {
      delayDateTimeWindow('2020-03-18T08:30:00.000+01:00',
        {start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}
      ).should.be.below(0);
    });
    it('should be positive when date is above time window', function() {
      delayDateTimeWindow('2020-03-18T10:30:00.000+01:00',
        {start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}
      ).should.be.above(0);
    });
  });

  describe('#getPlannedTimeWindow()', function() {
    const getPlannedTimeWindow = extraInfoModule.__get__('getPlannedTimeWindow');

    const timeWindows_0 = [];
    const timeWindows_1 = [{start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}];
    const timeWindows_2 = [{start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'},
      {start: '2020-03-18T11:00:00.000+01:00', end: '2020-03-18T12:00:00.000+01:00'}];

    it('should return null when time_windows empty', function() {
      should(getPlannedTimeWindow({date: '2020-03-18T10:00:00.000+01:00', time_windows: timeWindows_0}))
        .not.be.ok();
    });

    it('should return null when no time window found for mission date', function() {
      should(getPlannedTimeWindow({date: '2020-03-18T10:01:00.000+01:00', time_windows: timeWindows_1}))
        .not.be.ok();
      should(getPlannedTimeWindow({date: '2020-03-18T08:59:00.000+01:00', time_windows: timeWindows_1}))
        .not.be.ok();
    });

    it('should return the right time window', function() {
      should.equal(
        getPlannedTimeWindow({date: '2020-03-18T09:01:00.000+01:00', time_windows: timeWindows_1}),
        timeWindows_1[0]);
      should.equal(
        getPlannedTimeWindow({date: '2020-03-18T09:01:00.000+01:00', time_windows: timeWindows_2}),
        timeWindows_2[0]);
      should.equal(
        getPlannedTimeWindow({date: '2020-03-18T11:01:00.000+01:00', time_windows: timeWindows_2}),
        timeWindows_2[1]);
    });
  });

  describe('#computeMissionDelay()', function() {
    const computeMissionDelay = extraInfoModule.__get__('computeMissionDelay');
    var missionTemplate = {};
    beforeEach(() => { // Reset template
      missionTemplate = {
        date: '2020-03-18T10:30:00.000+01:00',
        mission_status_type_last_date: undefined,
        eta: undefined,
        time_windows: []
      };
    });

    it('should return 0 when planned timeWindows not found', function() {
      computeMissionDelay({...missionTemplate, time_windows: [{start: '2020-03-18T09:00:00.000+01:00', end: '2020-03-18T10:00:00.000+01:00'}]}, {is_last: true})
        .should.be.exactly(0);
    });


    it('should return positive when timewindow exist and ETA > end and is_last = undefined', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined})
        .should.be.above(0);
    });

    it('should return negative when timewindow exist and ETA < start and is_last = undefined', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T09:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: false})
        .should.be.below(0);
    });

    it('should use Eta to compute delay when mission_status_type_last_date exist and is_last = undefined', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T08:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined})
        .should.be.below(0);
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T08:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: undefined})
        .should.be.above(0);
    });

    it('should return 0 when timewindow exist and ETA > end and is_last = true and mission_status_type_last_date = undefined', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true})
        .should.be.exactly(0);
    });

    it('should return 0 when timewindow exist and ETA < start and is_last = true and mission_status_type_last_date = undefined', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T09:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true})
        .should.be.exactly(0);
    });

    it('should use mission_status_type_last_date to compute delay when mission_status_type_last_date exist and is_last = True', function() {
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T08:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T11:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true})
        .should.be.above(0);
      computeMissionDelay(
        {...missionTemplate,
          eta: '2020-03-18T11:30:00.000+01:00',
          mission_status_type_last_date: '2020-03-18T08:30:00.000+01:00',
          time_windows: [{start: '2020-03-18T10:00:00.000+01:00', end: '2020-03-18T11:00:00.000+01:00'}]
        }, {is_last: true})
        .should.be.below(0);
    });


    it('should use mission_status_type_last_date to compute delay when mission_status_type_last_date exist and is_last = True', function() {
      let m =     {
        id: 'mission-BMLkkAQ06X',
        company_id: 'company-abcdef',
        route_id: 'route-Utpf7SjRkRl',
        user_id: 'user-GdVhG5WBOv',
        mission_status_type_id: 'mission_status_type-nuWkL2gtR1P',
        mission_status_type_last_date: null,
        status_type_reference: 'mission_to_do',
        status_type_label: 'À faire',
        status_type_color: '#337AB7',
        sync_user: 'b6fd8c2ee5666e998606b883189f9589301fdc1e10866464236c6a60103aaefc',
        mission_type: 'mission',
        external_ref: 'mission-4025-2020_03_18-2286795',
        date: '2020-03-27T10:14:24.531+01:00',
        eta: '2020-03-27T10:57:26.979+01:00',
        eta_computed_at: null,
        eta_computed_mode: null,
        location: {
          lat: 44.83423,
          lon: -0.60068
        },
        address: {
          city: 'Bordeaux',
          country: 'France',
          postalcode: null,
          state: null,
          street: null
        },
        comment: null,
        phone: '(970)471-3536 x84078',
        reference: null,
        duration: null,
        quantities: null,
        tags: null,
        time_windows: []
      };
    });
  });
});
