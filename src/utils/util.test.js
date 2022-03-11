import { replaceStrAt } from './util.js';
test('replace string at index', () => {
  expect(replaceStrAt('abc', 1, 'd')).toBe('adc');
});
