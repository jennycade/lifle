import './App.css';
import { useState, useEffect, Fragment } from 'react';
import useFilter from './hooks/useFilter';

import getSpeciesList from './services/getSpeciesList';
import postGuess from './services/postGuess';
import formatNumber from './services/formatNumber';

import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';

function App() {
  const [guessInput, setGuessInput] = useState('');
  const [species, setSpecies] = useState('');
  const [showFilteredList, setShowFilteredList] = useState(false);
  const [prevGuesses, setPrevGuesses] = useState([]); // TODO: get from server?
  const [won, setWon] = useState(false);

  const filteredList = useFilter({list: species, filterText: guessInput});

  const onInputFocus = (e) => {
    // TODO: check for species loaded
    setShowFilteredList(true);
  }
  const onInputChange = (e) => {
    setGuessInput(e.target.value);
  }
  const onSpeciesClick = async (e) => {
    const speciesName = e.target.id;
    setShowFilteredList(false);
    // TODO: check that it wasn't already guessed
    const response = await postGuess(speciesName);
    if (response === 'win') {
      setWon(true);
    }
    const newGuesses = [...prevGuesses];
    newGuesses.push({speciesName, years: response});
    setPrevGuesses(newGuesses);

    // TODO: handle error
    setGuessInput('');
  }

  // get species
  useEffect(() => {
    const getSpecies = async () => {
      if (species.length === 0) {
        const newSpecies = await getSpeciesList();
        setSpecies(newSpecies);
      }
    }

    getSpecies();
  }, [species]);

  return (
    <div className="App">
      <header>
        <button><InfoIcon /></button>
        {/* menu bar: about, title, stats, settings */}
        <h1>Animle</h1>
        <div>
          <button><AssessmentIcon /></button>
          <button><SettingsIcon /></button>
        </div>
      </header>

      <main>
        {/* GUESSES */}
        <section className="prevGuesses">
          <div className='gridHeader'>Species</div>
          <div className='gridHeader'>Years since divergence</div>
          {
            prevGuesses.map((guess) => (
              <Fragment key={`guess-${guess.speciesName}`}>
                <div>{guess.speciesName}</div>
                <div>{formatNumber(guess.years === 'win' ? 0 : guess.years)}</div>
              </Fragment>
            ))
          }
        </section>

        {/* WINNING MESSAGE */}
        { won &&
          <section className='won'>
            <p>You won in {prevGuesses.length} guesses!</p>
            <p>Today's species is &nbsp;
              <a href={`https://www.google.com/search?q=${prevGuesses[prevGuesses.length -1].speciesName}`}
                target="_blank" rel="noreferrer"
              >
              {prevGuesses[prevGuesses.length -1].speciesName}</a>
            </p>
            <p>Come back tomorrow to play again.</p>
          </section>
        }

        {/* GUESS INPUT */}
        <section className="enterGuess">
          <input
            type="text"
            value={guessInput}
            onChange={onInputChange}
            onFocus={onInputFocus}
            disabled={won}
          />

          { showFilteredList &&
            <ul className='speciesList'>
              {filteredList.map((speciesObject) => (
                <li
                  key={speciesObject._id}
                  id={speciesObject.speciesName}
                  onClick={onSpeciesClick}
                >
                  {speciesObject.speciesName}
                </li>
              ))}
            </ul>
          }
          
        </section>
      </main>
    </div>
  );
}

export default App;
