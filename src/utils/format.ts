import { isNumber } from './type-check';

export function formatValue(value: unknown): string {
  if (isNumber(value)) {
    return value.toLocaleString('kr');
  }
  return String(value);
}
