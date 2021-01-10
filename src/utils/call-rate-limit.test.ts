// import { debounce, throttle } from './call-rate-limit';
import { debounce } from './call-rate-limit';

describe('throttle-debounce', () => {
  jest.spyOn(global, 'setTimeout');
  const limit = 100;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('`debounce`', () => {
    it('invokes callbacks once after as much time passed as the limit.', async () => {
      const callback = jest.fn();
      const trigger = debounce(callback, limit);

      // First call
      trigger();
      expect(callback).not.toBeCalled();

      // Trigger multiple times
      for (let i = 0; i < 10; i += 1) {
        trigger();
      }
      expect(callback).not.toBeCalled();

      // Fast-forward time, the callback should be run once.
      jest.runAllTimers();
      expect(callback).toBeCalledTimes(1);
    });
  });

  // describe('`throttle`', () => {
  //   it('invokes callbacks immediately then periodically.', async () => {
  //     const callback = jest.fn();
  //     const trigger = throttle(callback, limit);

  //     // First call
  //     trigger();
  //     expect(callback).toBeCalled();

  //     // Trigger multiple times periodically.
  //     for (let i = 0; i < 10; i += 1) {
  //       trigger();
  //     }
  //     expect(callback).toBeCalledTimes(1);

  //     // Passed limit, the callback should be able to run again.
  //     jest.advanceTimersByTime(limit);
  //     trigger();
  //     expect(callback).toBeCalledTimes(2);
  //   });
  // });
});
