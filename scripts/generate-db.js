#!/usr/bin/env node

const generator = require('../src/generate');
const print = require('../src/common/print');

try {
  print.info('请稍等，正在生成博客数据');
  generator.run()
  .then(() => {
    print.info('博客数据生成成功');
  }, err => {
    print.err(`博客数据生成失败`, err);
  });
} catch (e) {
  print.err(e);
}
