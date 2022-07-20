import { getResponse } from "./getResponse";

async function getSpeciesList() {
  /*
  get all species from server
  */

  const species = await getResponse('species', 'GET');

  return species;
}

export default getSpeciesList;