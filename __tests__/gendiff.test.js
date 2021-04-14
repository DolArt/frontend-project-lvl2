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
const file1Path = getFixturePath('flat1.json');
const file2Path = getFixturePath('flat2.json');
const paths = [file1Path, file2Path];

test('flat json-files', () => {
  const actual1 = genDiff(...paths);
  expect(actual1).toBe(expectedFile);
});
