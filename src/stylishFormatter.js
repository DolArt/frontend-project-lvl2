import _ from 'lodash';

const indentString = ' '.repeat(4);
const getIndent = (counter) => indentString.repeat(counter);

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const indent = getIndent(depth + 1);
  const closeBracketIndent = getIndent(depth);

  if (Array.isArray(data)) {
    const renderedArray = data
      .map((item) => `${indent}${stringify(item, depth + 1)}`)
      .join('\n');

    return `[\n${renderedArray}\n${closeBracketIndent}]`;
  }

  const renderedObject = Object.keys(data)
    .map((key) => `${indent}${key}: ${stringify(data[key], depth + 1)}`)
    .join('\n');

  return `{\n${renderedObject}\n${closeBracketIndent}}`;
};

const getStylishDiff = (diffTree) => {
  const iter = (diffs, depth = 0) => _.flatMapDeep(diffs, ({
    status,
    name,
    value,
    oldValue,
    newValue,
    children,
  }) => {
    const indent = getIndent(depth);
    switch (status) {
      case 'deleted':
        return `${indent}  - ${name}: ${stringify(value, depth + 1)}`;
      case 'added':
        return `${indent}  + ${name}: ${stringify(value, depth + 1)}`;
      case 'the same':
        return `${indent}    ${name}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${name}: ${stringify(oldValue, depth + 1)}`,
          `${indent}  + ${name}: ${stringify(newValue, depth + 1)}`,
        ];
      case 'changed nested items':
        return [
          `${indent}    ${name}: {`,
          iter(children, depth + 1),
          `${getIndent(depth + 1)}}`];
      default:
        throw new Error(`Unknown diff's item status: ${status}`);
    }
  });

  const lines = iter(diffTree);

  return `{\n${lines.join('\n')}\n}`;
};

export default getStylishDiff;
