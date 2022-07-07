function useFilter({list, filterText}) {
  let filteredList = [...list];

  const f = filterText.toLowerCase();
  if (f !== '') {
    // TODO (maybe): filter by abbreviated scientific name
    // abbreviated scientific name
    // ^(\w)\. ([\w ]+)

    // other
    filteredList = list.filter(
      (listItem) =>
        listItem.speciesName.toLowerCase().includes(f) ||
        listItem.otherNames.some(otherName => otherName.toLowerCase().includes(f))
    );
  }
  

  return filteredList;
}

export default useFilter;