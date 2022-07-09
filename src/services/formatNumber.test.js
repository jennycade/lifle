import formatNumber from "./formatNumber";

it('returns a string with no commas if the number is < 1000', () => {
  expect(formatNumber(123)).toBe('123');
  expect(formatNumber(0)).toBe('0')
  expect(formatNumber(999)).toBe('999');
});

it('inserts one comma for numbers from 1,000 to 999,999', () => {
  expect(formatNumber(1000)).toBe('1,000');
  expect(formatNumber(999999)).toBe('999,999');
  expect(formatNumber(38569)).toBe('38,569');
});

it('works on big numbers (under 2^53)', () => {
  expect(formatNumber(1916425561545465)).toBe('1,916,425,561,545,465');
});

it('throws an error when input is negative', () => {
  expect(() => {
    formatNumber(-1);
  }).toThrow();
});

it('throws an error when input is a float', () => {
  expect(() => {
    formatNumber(5684.54);
  }).toThrow();
});

it('throws an error when input is a string', () => {
  expect(() => {
    formatNumber('684684');
  }).toThrow();
});