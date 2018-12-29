const generator = require('../src/generate');

try {
  console.log('文章数据生成中...');
  generator.run()
  .then(() => {
    console.log('文章数据生成成功');
  }, err => {
    console.log(`文章数据生成失败，${err}`);
  });
} catch (e) {
  console.log(`文章数据生成失败，${e}`);
}
