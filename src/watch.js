/**
 * 这里使用了 node-watch 库，功能和官方的类似，不管 node-watch 还是官方提供的 watch 都有如下问题
 * 有些编辑器在修改文件的时候会有其他动作，例如在 WebStorm 中，在 watcher 状态下，修改某文件然后保存，打印 event 和 name 会看到如下信息
 * remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_tmp___
 * update---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md
 * remove---/Users/anonymous/Code/frontend/blog-birch/_post/Life/[test]-[20181228].md___jb_old___
 */

const path = require('path');
const watch = require('node-watch');
const generator = require('../src/generate');

exports.run = () => {
  const postPath = `${process.cwd()}/_post`;
  const watcher = watch(postPath, { recursive: true });

  watcher.on('change', function(evt, name) {
    const fileExtname = path.extname(name);

    if (fileExtname === '' || fileExtname === '.md') { // 简单解决某些文件编辑器会额外对文件名进行操作的问题
      try {
        generator.run().then(() => console.log('文章数据生成成功'), err => console.log(`文章数据生成失败 Error: ${err}`));
      } catch (e) {
        console.log(`错误:${e}`)
      }
    }
  });

  watcher.on('error', function(err) {
    console.log(err);
  });
};
