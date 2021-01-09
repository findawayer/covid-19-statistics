import { isNumericLiteral } from 'typescript';

export function isNumber(value: unknown): value is number {
  // Exclude NaN and Infinity, -Infinity from numeric values.
  return (
    typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
  );
}
