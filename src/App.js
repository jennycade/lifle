import './App.css';
import { useState, useEffect } from 'react';
import useFilter from './hooks/useFilter';

import getSpeciesList from './services/getSpeciesList';
import postGuess from './services/postGuess';

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
        {/* menu bar: about, title, stats, settings */}
        <h1>Animle</h1>
      </header>

      <main>
        <section className="prevGuesses">
          <div className='gridHeader'>Species</div>
          <div className='gridHeader'>Years since divergence</div>
          {
            prevGuesses.map((guess) => (
              <>
                <div>{guess.speciesName}</div>
                <div>{guess.years === 'win' ? 0 : guess.years}</div>
              </>
            ))
          }
        </section>

        { won &&
          <section className='won'>
            <p>You won!</p>
            <p>Today's species is {prevGuesses[prevGuesses.length -1].speciesName}</p>
          </section>
        }

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
