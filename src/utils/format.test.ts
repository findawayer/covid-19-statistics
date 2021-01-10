import { formatValue } from './format';

describe('`formatValue`', () => {
  it('injects comma properly to numeric inputs.', () => {
    expect(formatValue(1)).toBe('1');
    expect(formatValue(100)).toBe('100');
    expect(formatValue(1000)).toBe('1,000');
    expect(formatValue(1000000)).toBe('1,000,000');
    expect(formatValue(3.14)).toBe('3.14');
  });
  it('converts a non-numeric value to a string.', () => {
    expect(formatValue('foo')).toBe('foo');
    expect(formatValue(true)).toBe('true');
    expect(formatValue(null)).toBe('null');
    expect(formatValue([])).toBe('');
    expect(formatValue({})).toBe('[object Object]');
  });
});
