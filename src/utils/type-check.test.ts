import { isNumber } from './type-check';

describe('`isNumber`', () => {
  it('returns `true` when it receives a number.', () => {
    expect(isNumber(1)).toBeTruthy();
  });
  it('returns `false` when it receives a value of non-number type.', () => {
    expect(isNumber('1')).toBeFalsy();
    expect(isNumber('a')).toBeFalsy();
    expect(isNumber(true)).toBeFalsy();
  });
  it('returns `false` when it receives Infinity or NaN.', () => {
    expect(isNumber(NaN)).toBeFalsy();
    expect(isNumber(Infinity)).toBeFalsy();
    expect(isNumber(-Infinity)).toBeFalsy();
  });
});
