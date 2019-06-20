#!/usr/bin/env node
const projectStack = require('../lib/extract-stack');

projectStack.getProjectStack(process.cwd());
