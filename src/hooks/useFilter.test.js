import useFilter from './useFilter';

const dummyList = [
  {
    speciesName: 'Ursus Americanus',
    otherNames: [
      'North American black bear',
      'black bear'
    ],
  },
  {
    speciesName: 'Ursus Arctos',
    otherNames: [
      'brown bear',
      'grizzly',
      'grizzly bear'
    ],
  },
  {
    speciesName: 'Ursus Maritimus',
    otherNames: [
      'polar bear',
    ],
  },
  {
    speciesName: 'Ursus thibetanus',
    otherNames: [
      'Asiatic black bear',
      'moon bear',
      'Himalayan black bear',
    ],
  },
  {
    speciesName: 'Tremarctos ornatus',
    otherNames: [
      'Andean bear',
      'spectacled bear',
    ],
  },
  {
    speciesName: 'Ailuropoda melanoleuca',
    otherNames: [
      'panda',
      'panda bear',
    ],
  },
  {
    speciesName: 'Melursus (Ursus) ursinus',
    otherNames: [
      'sloth bear',
    ],
  },
  {
    speciesName: 'Ursus malayanus',
    otherNames: ['sun bear'],
  },
];

test(`returns full list when filterText is blank`, () => {
  const bearList = useFilter({list: dummyList, filterText: ''});
  // 8 bear species
  expect(bearList.length).toBe(dummyList.length);
});

test(`filters by otherNames - renders only panda item when filterText is "panda"`, () => {
  
  const bearList = useFilter({list: dummyList, filterText: 'panda'}); 
  // length
  expect(bearList.length).toBe(1);

  expect(bearList).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        {speciesName: 'Ailuropoda melanoleuca'}
      )
    ])
  );
});

test(`filters by id - renders only panda item when filterText is "Ailuropoda melanoleuca"`, () => {
  
  const bearList = useFilter({list: dummyList, filterText: 'Ailuropoda melanoleuca'});
  // length
  expect(bearList.length).toBe(1);

  expect(bearList).toEqual((
    expect.arrayContaining([
      expect.objectContaining({
        speciesName: 'Ailuropoda melanoleuca'
      })
    ])
  ))
});

test(`case insensitive for id`, () => {
  const bearList = useFilter({list: dummyList, filterText: 'ursus americanus'});
  // length
  expect(bearList.length).toBe(1);

  expect(bearList).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        speciesName: expect.stringMatching(/Ursus americanus/i)
      })
    ])
  );
});

xit(`Allows scientfic name to be abbreviated - U. americanus`, () => {
  const bearList = useFilter({list: dummyList, filterText: 'U. americanus'});
  // length
  expect(bearList.length).toBe(1);

  expect(bearList).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        speciesName: expect.stringMatching(/Ursus americanus/i)
      })
    ])
  );
});


// handle parentheses?