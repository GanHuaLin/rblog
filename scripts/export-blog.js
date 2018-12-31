#!/usr/bin/env node

const { execSync } = require('child_process');
const helper = require('../src/common/helper');
const generator = require('../src/generate');
const COMMON_CONST = require('./const');

let currentPlatformRootPath = COMMON_CONST.PC_ROOT_PATH;

if (process.argv.indexOf('-m') !== -1) {
  currentPlatformRootPath = COMMON_CONST.MOBILE_ROOT_PATH;
}

helper.existArticleMetaAndListAfter(() => {
  execSync(`next build ${currentPlatformRootPath} && next export ${currentPlatformRootPath}`, { stdio: 'inherit' });
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
