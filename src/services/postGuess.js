const MAX_YEARS = 8320000;

async function postGuess(speciesId, gameId, userId) {
  // TODO: make it real
  // TODO: check against species list
  // TODO: respond with years or win
  const route = `users/${userId}/games/${gameId}/guesses/${speciesId}`;
  console.log(`Send POST request to /${route}`);

  // randomly respond with win or years
  const chanceOfWinning = 1/6;
  const randomNumber = Math.random();
  if (randomNumber <= chanceOfWinning) {
    return 'win';
  }

  // random number of year (in the millions)
  const years = Math.floor(Math.random() * MAX_YEARS);
  return years;
}

export default postGuess;