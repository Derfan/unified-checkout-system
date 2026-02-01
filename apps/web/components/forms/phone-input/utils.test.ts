import { describe, it, expect } from 'vitest';
import { formatDynamicPhone } from './utils';

describe('formatDynamicPhone', () => {
  it('should format German phone numbers correctly', () => {
    expect(formatDynamicPhone('+4915123456789')).toBe('+49 1512 3456789');
    expect(formatDynamicPhone('4915123456789')).toBe('+49 1512 3456789');
  });

  it('should format Austrian phone numbers correctly', () => {
    expect(formatDynamicPhone('+43123456789')).toBe('+43 1234 56789');
    expect(formatDynamicPhone('43123456789')).toBe('+43 1234 56789');
  });

  it('should format Swiss phone numbers correctly', () => {
    expect(formatDynamicPhone('+41234567890')).toBe('+41 23 456 78 90');
    expect(formatDynamicPhone('41234567890')).toBe('+41 23 456 78 90');
  });

  it('should return the raw input if country code is not recognized', () => {
    expect(formatDynamicPhone('+99123456789')).toBe('+99123456789');
    expect(formatDynamicPhone('99123456789')).toBe('+99123456789');
  });

  it('should handle inputs without a leading + correctly', () => {
    expect(formatDynamicPhone('15123456789')).toBe('+15123456789');
  });
});
