import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';
// import getObjectKeys from './getObjectKeys.js';

const genDiff = (file1Path, file2Path) => {
  const file1 = fs.readFileSync(file1Path);
  const extension1 = path.extname(file1Path);
  const file2 = fs.readFileSync(file2Path);
  const extension2 = path.extname(file2Path);

  const data1 = parseData(file1, extension1);
  const data2 = parseData(file2, extension2);

  const getDiff = (obj1, obj2) => {
    const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
    return allKeys.map((key) => {
      if (!_.has(obj1, key)) {
        return { status: 'added', name: key, value: obj2[key] };
      }
      if (!_.has(obj2, key)) {
        return { status: 'deleted', name: key, value: obj1[key] };
      }
      if (_.isEqual(obj1[key], obj2[key])) {
        return { status: 'the same', name: key, value: obj1[key] };
      }
      if (!(_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]))) {
        return {
          status: 'changed',
          name: key,
          oldValue: obj1[key],
          newValue: obj2[key],
        };
      }
      return {
        status: 'changed nested items',
        name: key,
        children: getDiff(obj1[key], obj2[key]),
      };
    });
  };

  return getDiff(data1, data2);
};

export default genDiff;

const a = '../__fixtures__/nested1.json';
const b = '../__fixtures__/nested2.json';
console.log(JSON.stringify(genDiff(a, b), null, '  '));
