function FilterableList({list, filterText}) {
  let filteredList = [...list];

  const f = filterText.toLowerCase();
  if (f !== '') {
    // abbreviated scientific name
    // ^(\w)\. ([\w ]+)

    // other
    filteredList = list.filter(
      (listItem) =>
        listItem.speciesName.toLowerCase().includes(f) ||
        listItem.otherNames.some(otherName => otherName.toLowerCase().includes(f))
    );
  }
  

  return (
    <ul>
      {
        filteredList.map((listItem) => (
          <li key={listItem.speciesName}>
            {listItem.speciesName}
          </li>
        ))
      }
    </ul>
  );
}

export default FilterableList;