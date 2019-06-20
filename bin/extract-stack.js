#!/usr/bin/env node
const projectStack = require('../lib/extract-stack');

const manakin = require('manakin');

// add console colors
// tslint:disable-next-line
manakin.global;

projectStack.getProjectStack(process.cwd());
