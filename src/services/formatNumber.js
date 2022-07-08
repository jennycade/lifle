function formatNumber({year}) {
  // insert commas e.g. 70517946 -> '70,517,946'
  if (year < 1000) {
    return `${year}`;
  } else {
    // convert to string
    let str = '';
    for (let i=0; i<Math.log10(year); i+=3) {
      // TODO: draw this out!
    }

  }
}

export default formatNumber;