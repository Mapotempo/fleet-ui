import { renderHook, act } from '@testing-library/react-hooks';

import { useUrlHashParam } from '../../src/hooks/useUrlHashParam';
var should = require('should');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


describe('Hooks', function() {
  describe('#useUrlHashParam()', function() {
    before(function() {
      var { window } = new JSDOM(``, {
        runScripts: "outside-only",
        url: "https://example.org/"
      });
      window.host = 'localhost';
      global.window = window;
    });
    const reinitLocation = () => {window.location.hash='';};
    beforeEach(() => reinitLocation());

    it('should change url hash params', async function() {
      // hook shape: [param, setParamValue]
      const {result, waitForNextUpdate} = renderHook(() => useUrlHashParam('test'));
      act(() => {
        result.current[1](1); // perform setParamValue
      });
      await waitForNextUpdate();
      should.equal(result.current[0], '1'); // check param value
    });
  });
});
