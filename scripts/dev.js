#!/usr/bin/env node

const { execSync } = require('child_process');
const program = require('commander');
const helper = require('../src/common/helper');
const print = require('../src/common/print');
const generator = require('../src/generate');
const COMMON_CONST = require('./const');

program
.version('0.0.1')
.option('-w, --watch', 'watching _post directory')
.parse(process.argv.filter(currVal => (currVal !== '-p') && (currVal !== '-m')));

let currentPlatformRootPath = COMMON_CONST.PC_ROOT_PATH;

if (process.argv.indexOf('-m') !== -1) {
  currentPlatformRootPath = COMMON_CONST.MOBILE_ROOT_PATH;
}

helper.existArticleMetaAndListAfter(() => {
  if (program.watch) { // 开启文件监控
    try {
      execSync(`next dev ${currentPlatformRootPath} & npm run watch`, { stdio: 'inherit' });
    } catch (e) {
      print.err('启动错误', e);
    }
  } else { // 只是开启开发模式
    try {
      execSync(`next dev ${currentPlatformRootPath}`, { stdio: 'inherit' });
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
