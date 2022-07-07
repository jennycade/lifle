import species from '../data/sample_species.json';

async function getSpeciesList() {
  // TODO: change to real database
  // TODO: wrap in useMemo to avoid unnecessary db calls
  

  return species;
}

export default getSpeciesList;