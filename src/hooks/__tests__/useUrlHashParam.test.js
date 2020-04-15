import { renderHook, act } from '@testing-library/react-hooks';

import { useUrlHashParam } from '../useUrlHashParam';


describe('Hooks', function() {
  describe('#useUrlHashParam()', function() {
    const reinitLocation = () => {window.location.hash='';};
    beforeEach(() => reinitLocation());

    it('should change url hash params', async function() {
      // hook shape: [param, setParamValue]
      const {result, waitForNextUpdate} = renderHook(() => useUrlHashParam('test'));
      act(() => {
        result.current[1](1); // perform setParamValue
      });
      await waitForNextUpdate();
      expect(result.current[0]).toBe('1'); // check param value
    });
  });
});
