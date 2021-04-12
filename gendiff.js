import _ from 'lodash';
import * as fs from 'fs';

const genDiff = (file1Path, file2Path) => {
  const data1 = JSON.parse(fs.readFileSync(file1Path));
  const data2 = JSON.parse(fs.readFileSync(file2Path));

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
// '../hexlet/files/file1.json'
// '../hexlet/files/file2.json'
export default genDiff;
