import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedFile = readFile('expected.txt');
const json1Path = getFixturePath('flat1.json');
const json2Path = getFixturePath('flat2.json');
const yaml1Path = getFixturePath('flat1.yaml');
const yaml2Path = getFixturePath('flat2.yml');

test('flat json-files', () => {
  const actual1 = genDiff(json1Path, json2Path);
  expect(actual1).toBe(expectedFile);
});

test('flat yaml-files', () => {
  const actual1 = genDiff(yaml1Path, yaml2Path);
  expect(actual1).toBe(expectedFile);
});
