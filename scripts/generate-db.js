const helper = require('../generator/helper');
const generator = require('../generator/db');

try {
  console.log('文章数据生成中...');
  const articleMetaAndListCombine = helper.fetchArticleMetaAndList();
  Promise.all([
    generator.generateArticleMetaDb(articleMetaAndListCombine.articleMeta),
    generator.generateArticleListDb(articleMetaAndListCombine.articleList)
  ])
  .then(() => {
    console.log('文章数据生成成功');
  }, err => {
    console.log('文章数据生成失败');
    console.log(err)
  });
} catch (e) {
  console.log(e);
}
