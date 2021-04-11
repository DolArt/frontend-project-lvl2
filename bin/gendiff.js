#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<file1path>, <file2path>')
  .option('-f, --format [type]', 'output format')

program.parse(process.argv);