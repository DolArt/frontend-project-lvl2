import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishFormattingExpectation = readFile('stylishResult.txt');
const json1Path = getFixturePath('oldVersion.json');
const json2Path = getFixturePath('newVersion.json');
const yaml1Path = getFixturePath('oldVersion.yaml');
const yaml2Path = getFixturePath('newVersion.yml');

describe('stylish formatting', () => {
  test('.json files comparison', () => {
    expect(genDiff(json1Path, json2Path)).toBe(stylishFormattingExpectation);
  });

  test('.yml files comparison', () => {
    expect(genDiff(yaml1Path, yaml2Path)).toBe(stylishFormattingExpectation);
  });
});
