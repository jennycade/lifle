function FilterableList({list, filterText}) {
  let filteredList = [...list];

  const f = filterText.toLowerCase();
  if (f !== '') {
    // abbreviated scientific name
    // ^(\w)\. ([\w ]+)

    // other
    filteredList = list.filter(
      (listItem) =>
        listItem.id.toLowerCase().includes(f) ||
        listItem.otherNames.some(otherName => otherName.toLowerCase().includes(f))
    );
  }
  

  return (
    <ul>
      {
        filteredList.map((listItem) => (
          <li key={listItem.id}>
            {listItem.id}
          </li>
        ))
      }
    </ul>
  );
}

export default FilterableList;