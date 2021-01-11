import { CURRENT_LOCALE } from '../config/locale';
import { isNumber } from './type-check';

export function toReadableString(
  value: unknown,
  locale: string = CURRENT_LOCALE,
): string {
  if (isNumber(value)) {
    return value.toLocaleString(locale);
  }
  return String(value);
}
