var should = require('should');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var rewire = require("rewire");

const urlParamsModule = rewire("../../src/lib/urlParams.js");

describe('Lib - urlParams', function() {
  var funTest = null;

  before(function() {
    var { window } = new JSDOM(``, {
      runScripts: "outside-only",
      url: "https://example.org/"
    });
    window.host = 'localhost';
    global.window = window;
  });

  const reinitLocation = () => {window.location.hash=''; window.history.pushState({}, null, '/');};

  describe('#getUrlParams()', function() {
    before(() => funTest = urlParamsModule.__get__('getUrlParams'));
    beforeEach(() => reinitLocation());
    it('should return right parameter', function() {
      window.location.hash="first=1&second=two&third=truie";
      should.equal(funTest(true)['first'], '1');
      should.equal(funTest(true)['second'], 'two');
      should.equal(funTest(true)['third'], 'truie');
    });
  });
  describe('#setUrlParams()', function() {
    before(() => funTest = urlParamsModule.__get__('setUrlParams'));
    beforeEach(() => reinitLocation());
    it('should set dom hash', function() {
      let params = {
        toto: 'tata',
        titi: 'toto',
        tata: 0
      };
      funTest(params, true);
      should.equal(window.location.hash,
        "#toto=tata&titi=toto&tata=0");
    });
    it('should set dom query', function() {
      let params = {
        toto: 'tata',
        titi: 'toto',
        tata: 0
      };
      funTest(params, false);
      window.location.hash = 'toto';
      should.equal(window.location.search,
        "?toto=tata&titi=toto&tata=0");
    });
  });
  describe('#getUrlParam()', function() {
    before(() => funTest = urlParamsModule.__get__('getUrlParam'));
    beforeEach(() => reinitLocation());
    it('should return selected param', function() {
      window.location.hash="first=1&second=two&third=truie";
      should.equal(funTest('first', true), 1);
      should.equal(funTest('second', true), 'two');
    });
  });

  describe('#setUrlParam()', function() {
    before(() => funTest = urlParamsModule.__get__('setUrlParam'));
    beforeEach(() => reinitLocation());
    it('should set selected param in dom hash', function() {
      funTest('test', 3, true);
      should.equal(window.location.hash, "#test=3");
    });
    it('should set selected param without touch other in dom hash', function() {
      window.location.hash = 'truc=5';
      funTest('test', 3, true);
      should.equal(window.location.hash, "#truc=5&test=3");
    });
    it('should set selected param in dom query', function() {
      funTest('test', 3, false);
      should.equal(window.location.search, "?test=3");
    });
    it('should set selected param without touch other in dom query', function() {
      window.history.pushState({}, null, `?truc=5`);
      funTest('test', 3, false);
      should.equal(window.location.search, "?truc=5&test=3");
    });
  });
});
