#!/usr/bin/env node

const { execSync } = require('child_process');
const helper = require('../src/common/helper');

helper.existArticleMetaAndListAfter(() => {
  execSync('next build && next export', { stdio: 'inherit' });
});
