import { formatJoinDate } from '../src/utils/format';

describe('formatJoinDate', () => {
  it('retourne "Date inconnue" pour null/undefined/empty', () => {
    expect(formatJoinDate(null)).toBe('Date inconnue');
    expect(formatJoinDate(undefined)).toBe('Date inconnue');
    expect(formatJoinDate('')).toBe('Date inconnue');
  });

  it('retourne "Date invalide" pour une chaîne non parsable', () => {
    expect(formatJoinDate('pas-une-date')).toBe('Date invalide');
  });

  it('formate une date ISO en français', () => {
    const result = formatJoinDate('2024-01-15T00:00:00Z');
    expect(result).toMatch(/15.*janvier.*2024/);
  });
});
