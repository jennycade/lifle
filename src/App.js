import './App.css';
import { useState, useEffect, Fragment } from 'react';

// components
import Modal from './components/Modal';

// hooks
import useFilter from './hooks/useFilter';

// services
import getSpeciesList from './services/getSpeciesList';
import postGuess from './services/postGuess';
import formatNumber from './services/formatNumber';

// icons
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShareIcon from '@mui/icons-material/Share';

// constants
const MAX_YEARS = 8320000;

function App() {
  const [display, setDisplay] = useState('game');
  const [guessInput, setGuessInput] = useState('');
  const [species, setSpecies] = useState('');
  const [showFilteredList, setShowFilteredList] = useState(false);
  const [prevGuesses, setPrevGuesses] = useState([]); // TODO: get from server?
  const [won, setWon] = useState(false);

  const filteredList = useFilter({list: species, filterText: guessInput});

  const openModal = (modal) => {
    setDisplay(modal);
  }
  const closeModal = (e) => {
    setDisplay('game');
  }
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
        <button onClick={() => openModal('info')}><InfoIcon /></button>
        {/* menu bar: about, title, stats, settings */}
        <h1>Animle</h1>
        <div>
          <button onClick={() => openModal('stats')}><AssessmentIcon /></button>
          <button onClick={() => openModal('settings')}><SettingsIcon /></button>
        </div>
      </header>

      <main>
        {/* MODALS */}
        {/* info */}
        { display === 'info' &&
          <Modal onClose={closeModal}>
            <h2>How to play</h2>
            <p>Guess today's animal species. You can use as many guesses as you need.</p>
            <p>Filter by species name (in future: common names!)</p>
            <p>After each guess you'll see how closely related your guess is to the target species.</p>
          </Modal>
        }
        {/* stats */}
        { display === 'stats' &&
          <Modal onClose={closeModal}>
            <h2>Statistics</h2>
            {/* TODO: statistics from API */}
            <dl>
              <dt>Games played</dt>
              <dd>##</dd>
              
              <dt>Percent won</dt>
              <dd>##.#%</dd>

              <dt>Current streak</dt>
              <dd>## days</dd>

              <dt>Guesses</dt>
              <dd>(Histogram goes here)</dd>
              {/* TODO: histogram */}
            </dl>

            <p><button>{<ShareIcon/>} Share</button></p>
            {/* TODO: share */}
          </Modal>
        }
        {/* settings */}
        { display === 'settings' &&
          <Modal onClose={closeModal}>
            <h2>Settings</h2>
            <p>Coming soon: dark mode</p>
            {/* TODO: dark/light mode */}
          </Modal>
        }

        {/* INSTRUCTIONS */}
        { prevGuesses.length === 0 &&
          <section className="instructions">
            Guess today's animal species
          </section>
        }

        {/* GUESSES */}
        { prevGuesses.length > 0 && 
          <section className="prevGuesses">
            <div className='gridHeader'>Species</div>
            <div className='gridHeader'>Years since divergence</div>
            {
              prevGuesses.map((guess) => (
                <Fragment key={`guess-${guess.speciesName}`}>
                  <progress
                    value={guess.years === 'win' ?
                      MAX_YEARS : MAX_YEARS - guess.years}
                    max={MAX_YEARS}
                  />
                  <div>{guess.speciesName}</div>
                  <div>{formatNumber(guess.years === 'win' ? 0 : guess.years)}</div>
                </Fragment>
              ))
            }
          </section>
        }

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
          <label htmlFor="guessInput">Species name</label>
          <input
            type="text"
            id="guessInput"
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
