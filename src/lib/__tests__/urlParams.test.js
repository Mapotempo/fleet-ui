import {getUrlParams, setUrlParams, getUrlParam, setUrlParam} from "../urlParams.js";

describe('Lib - urlParams', function() {

  const reinitLocation = () => {window.location.hash=''; window.history.pushState({}, null, '/');};

  describe('#getUrlParams()', function() {
    beforeEach(() => reinitLocation());
    it('should return right parameter', function() {
      window.location.hash="first=1&second=two&third=truie";
      // global.window = window;
      expect(getUrlParams(true)['first']).toBe('1');
      expect(getUrlParams(true)['second']).toBe('two');
      expect(getUrlParams(true)['third']).toBe('truie');
    });
  });
  describe('#setUrlParams()', function() {
    beforeEach(() => reinitLocation());
    it('should set dom hash', function() {
      let params = {
        toto: 'tata',
        titi: 'toto',
        tata: 0
      };
      setUrlParams(params, true);
      expect(window.location.hash).toBe("#toto=tata&titi=toto&tata=0");
    });
    it('should set dom query', function() {
      let params = {
        toto: 'tata',
        titi: 'toto',
        tata: 0
      };
      setUrlParams(params, false);
      window.location.hash = 'toto';
      expect(window.location.search).toBe("?toto=tata&titi=toto&tata=0");
    });
  });
  describe('#getUrlParam()', function() {
    beforeEach(() => reinitLocation());
    it('should return selected param', function() {
      window.location.hash="first=1&second=two&third=truie";
      expect(getUrlParam('first', true)).toBe("1");
      expect(getUrlParam('second', true)).toBe('two');
    });
  });

  describe('#setUrlParam()', function() {
    beforeEach(() => reinitLocation());
    it('should set selected param in dom hash', function() {
      setUrlParam('test', 3, true);
      expect(window.location.hash).toBe("#test=3");
    });
    it('should set selected param without touch other in dom hash', function() {
      window.location.hash = 'truc=5';
      setUrlParam('test', 3, true);
      expect(window.location.hash).toBe("#truc=5&test=3");
    });
    it('should set selected param in dom query', function() {
      setUrlParam('test', 3, false);
      expect(window.location.search).toBe("?test=3");
    });
    it('should set selected param without touch other in dom query', function() {
      window.history.pushState({}, null, `?truc=5`);
      setUrlParam('test', 3, false);
      expect(window.location.search).toBe("?truc=5&test=3");
    });
  });
});
