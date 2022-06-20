import { render, screen } from '@testing-library/react';
import FilterableList from './FilterableList';

const dummyList = [
  {
    id: 'Ursus Americanus',
    otherNames: [
      'North American black bear',
      'black bear'
    ],
  },
  {
    id: 'Ursus Arctos',
    otherNames: [
      'brown bear',
      'grizzly',
      'grizzly bear'
    ],
  },
  {
    id: 'Ursus Maritimus',
    otherNames: [
      'polar bear',
    ],
  },
  {
    id: 'Ursus thibetanus',
    otherNames: [
      'Asiatic black bear',
      'moon bear',
      'Himalayan black bear',
    ],
  },
  {
    id: 'Tremarctos ornatus',
    otherNames: [
      'Andean bear',
      'spectacled bear',
    ],
  },
  {
    id: 'Ailuropoda melanoleuca',
    otherNames: [
      'panda',
      'panda bear',
    ],
  },
  {
    id: 'Melursus (Ursus) ursinus',
    otherNames: [
      'sloth bear',
    ],
  },
  {
    id: 'Ursus malayanus',
    otherNames: ['sun bear'],
  },
];

test(`renders full list when filterText is blank`, () => {
  render(<FilterableList list={dummyList} filterText="" />);
  // 8 bear species
  const bearList = screen.getAllByRole('listitem');
  expect(bearList.length).toBe(dummyList.length);
});

test(`filters by otherNames - renders only panda item when filterText is "panda"`, () => {
  render(<FilterableList list={dummyList} filterText="panda" />);
  
  // length
  const bearList = screen.getAllByRole('listitem'); 
  expect(bearList.length).toBe(1);

  // panda item
  const pandaItem = screen.getByText(/Ailuropoda melanoleuca/i);
  expect(pandaItem).toBeInTheDocument();
});

test(`filters by id - renders only panda item when filterText is "Ailuropoda melanoleuca"`, () => {
  render(<FilterableList list={dummyList} filterText="Ailuropoda melanoleuca" />);
  
  // length
  const bearList = screen.getAllByRole('listitem'); 
  expect(bearList.length).toBe(1);

  // panda item
  const pandaItem = screen.getByText(/Ailuropoda melanoleuca/i);
  debugger;
  expect(pandaItem).toBeInTheDocument();
});

// filters by id
// case-insensitive
// 