const generator = require('../src/generator/db');

try {
  console.log('文章数据生成中...');
  generator.run()
  .then(() => {
    console.log('文章数据生成成功');
  }, err => {
    console.log('文章数据生成失败');
    console.log(err)
  });
} catch (e) {
  console.log(e);
}
