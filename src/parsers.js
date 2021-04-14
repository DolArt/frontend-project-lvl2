import yaml from 'js-yaml';

const parseData = (file, fileExtension) => {
  switch (fileExtension) {
    case '.yaml':
      return yaml.load(file);
    case '.yml':
      return yaml.load(file);
    default:
      return JSON.parse(file);
  }
};

export default parseData;
