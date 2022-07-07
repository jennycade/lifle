import './App.css';
import { useState, useEffect } from 'react';
import FilterableList from './components/FilterableList';
import getSpeciesList from './services/getSpeciesList';

function App() {
  const [guessInput, setGuessInput] = useState('');
  const [species, setSpecies] = useState('');

  const onInputChange = (e) => {
    setGuessInput(e.target.value);
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

        </section>

        <section className="enterGuess">
          <input
            type="text"
            value={guessInput}
            onChange={onInputChange}
          />
          {/* hide when input box doesn't have focus */}
          <FilterableList list={species} filterText={guessInput} />
        </section>
      </main>
    </div>
  );
}

export default App;
