#!/usr/bin/env node

const { execSync } = require('child_process');
const helper = require('../src/common/helper');
const generator = require('../src/generate');

helper.existArticleMetaAndListAfter(() => {
  execSync('next build && next start', { stdio: 'inherit' });
}, (existAfterFunc) => {
  try {
    print.info('请稍等，正在生成博客数据');
    generator.run()
    .then(() => {
      print.info('博客数据生成成功');
      existAfterFunc();
    }, err => {
      print.err(`博客数据生成失败`, err);
    });
  } catch (e) {
    print.err(`博客数据生成失败`, e);
  }
});
