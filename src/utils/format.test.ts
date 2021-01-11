import { toReadableString } from './format';

describe('`toReadableString`', () => {
  it('injects comma properly to numeric inputs.', () => {
    expect(toReadableString(1)).toBe('1');
    expect(toReadableString(100)).toBe('100');
    expect(toReadableString(1000)).toBe('1,000');
    expect(toReadableString(1000000)).toBe('1,000,000');
    expect(toReadableString(3.14)).toBe('3.14');
  });
  it('converts a non-numeric value to a string.', () => {
    expect(toReadableString('foo')).toBe('foo');
    expect(toReadableString(true)).toBe('true');
    expect(toReadableString(null)).toBe('null');
    expect(toReadableString([])).toBe('');
    expect(toReadableString({})).toBe('[object Object]');
  });
});
