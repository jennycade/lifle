function FilterableList({list, filterText}) {
  let filteredList = [...list];

  // filterText
  if (filterText !== '') {
    filteredList = list.filter(
      (listItem) => listItem.id.includes(filterText) ||
        listItem.otherNames.some(otherName => otherName.includes(filterText))
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