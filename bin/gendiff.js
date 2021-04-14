#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<file1path> <file2path>')
  .option('-f, --format [type]', 'output format')
  // eslint-disable-next-line no-console
  .action((file1path, file2path) => console.log(genDiff(file1path, file2path)));

program.parse(process.argv);
