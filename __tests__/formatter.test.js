import { test, expect } from '@jest/globals';
import getStylishDiff from '../src/stylishFormatter.js';

const nestedDiff = [
  {
    status: 'added',
    name: 'setting5',
    value: {
      key5: 'value5',
      key6: {
        name: 'Vasya',
        city: 'Kiev',
        languages: {
          english: 'yes',
          french: 'no',
        },
      },
      key7: true,
    },
  },
  {
    status: 'added',
    name: 'follow',
    value: false,
  },
  {
    status: 'the same',
    name: 'setting1',
    value: 'Value 1',
  },
  {
    status: 'deleted',
    name: 'setting2',
    value: 200,
  },
  {
    status: 'added',
    name: 'setting5',
    value: {
      key5: 'value5',
      key6: {
        name: 'Vasya',
        city: 'Kiev',
      },
      key7: true,
    },
  },
  {
    status: 'changed',
    name: 'baz',
    oldValue: [1, 2, 3],
    newValue: [0, { key: 'value' }, 4],
  },

  {
    status: 'changed',
    name: 'nest',
    oldValue: {
      key: 'value',
    },
    newValue: 'str',
  },
  {
    status: 'nested',
    name: 'group1',
    children: [
      {
        status: 'changed',
        name: 'baz',
        oldValue: 'bas',
        newValue: 'bars',
      },
      {
        status: 'the same',
        name: 'foo',
        value: {
          prop: true,
        },
      },
      {
        status: 'changed',
        name: 'nest',
        oldValue: {
          key: 'value',
        },
        newValue: 'str',
      },
    ],
  },
];

  expect(getStylishDiff(nestedDiff)).toBe(result);
});
