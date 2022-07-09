function formatNumber(year) {
  // insert commas e.g. 70517946 -> '70,517,946'

  // validate input
  if (typeof(year) !== 'number') {
    const err = new TypeError('year must be a number');
    throw(err);
  }
  if (year < 0) {
    const err = new TypeError('year must be >= 0');
    throw(err);
  }
  if (year % 1 !== 0) {
    const err = new TypeError('year must be an integer');
    throw(err);
  }

  const strNum = `${year}`;
  let result = '';
  for (let i = strNum.length - 1; i >= 0; i--) {
    const place = strNum.length - i;
    result = strNum[i] + result;
    if (place % 3 === 0) {
      result = ',' + result;
    }
  }
  if (result[0] === ',') {
    result = result.slice(1);
  }
  return result;
}

export default formatNumber;