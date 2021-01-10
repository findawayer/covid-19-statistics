import { DEFAULT_FUNCTION_CALL_RATE_LIMIT } from '../config/optimizations';

export function debounce(
  fn: (...args: any[]) => void,
  limit = DEFAULT_FUNCTION_CALL_RATE_LIMIT,
) {
  let lastTimeoutId: number;

  return function debouncedFn(this: unknown, ...args: any[]) {
    const context = this;
    window.clearTimeout(lastTimeoutId);
    lastTimeoutId = window.setTimeout(() => {
      fn.apply(context, args);
    }, limit);
  };
}

export function throttle(
  fn: (...args: any[]) => void,
  limit = DEFAULT_FUNCTION_CALL_RATE_LIMIT,
) {
  let lastCall: number;
  let lastTimeoutId: number;

  return function throttledFn(this: unknown, ...args: any[]) {
    const context = this;
    if (!lastCall) {
      fn.apply(context, args);
      lastCall = Date.now();
    } else {
      const elapsed = Date.now() - lastCall;
      window.clearTimeout(lastTimeoutId);
      lastTimeoutId = window.setTimeout(function call() {
        if (elapsed >= limit) {
          fn.apply(context, args);
          lastCall = Date.now();
        }
      }, limit - elapsed);
    }
  };
}
