import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';

const genDiff = (file1Path, file2Path) => {
  const file1 = fs.readFileSync(file1Path);
  const extension1 = path.extname(file1Path);
  const file2 = fs.readFileSync(file2Path);
  const extension2 = path.extname(file2Path);

  const data1 = parseData(file1, extension1);
  const data2 = parseData(file2, extension2);

  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.cloneDeep(keys).sort();

  const resultArray = sortedKeys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return [...acc, `  + ${key}: ${data2[key]}`];
    }
    if (!_.has(data2, key)) {
      return [...acc, `  - ${key}: ${data1[key]}`];
    }
    if (data1[key] !== data2[key]) {
      return [...acc, `  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
    }
    return [...acc, `    ${key}: ${data1[key]}`];
  }, []);

  return `{\n${resultArray.join('\n')}\n}`;
};

export default genDiff;