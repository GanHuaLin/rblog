#!/usr/bin/env node

const { execSync } = require('child_process');
const program = require('commander');
const helper = require('../src/common/helper');
const print = require('../src/common/print');
const generator = require('../src/generate');

program
.version('0.0.1')
.option('-w, --watch', 'watching _post directory')
.parse(process.argv);

helper.existArticleMetaAndListAfter(() => {
  if (program.watch) { // 开启文件监控
    try {
      execSync('next & npm run watch', { stdio: 'inherit' });
    } catch (e) {
      print.err('启动错误', e);
    }
  } else { // 只是开启开发模式
    try {
      execSync('next', { stdio: 'inherit' });
    } catch (e) {
      print.err('启动错误', e);
    }
  }
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
