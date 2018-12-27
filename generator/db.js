const fs = require('fs');
const helper = require('./helper');

const dbPath = `${process.cwd()}/db`;
const ARTICLE_META_FILE_NAME = 'article-meta.json';
const ARTICLE_LIST_FILE_NAME = 'article-list.json';

console.log('请稍等...');

try {
  const articleMeta = helper.fetchArticleMeta({});
  helper.clearArticleMetaData(articleMeta);
  const articleList = helper.fetchArticleList(articleMeta);

  const writeArticleMetaDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_META_FILE_NAME}`);
  const writeArticleListDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_LIST_FILE_NAME}`);

  writeArticleMetaDbStream.end(JSON.stringify(articleMeta));
  writeArticleListDbStream.end(JSON.stringify(articleList));

  writeArticleMetaDbStream.on('error', (error) => {
    helper.removeDirectoryFile(dbPath);
    console.log(`sorry error: ${error}`);
  });

  writeArticleListDbStream.on('error', (error) => {
    helper.removeDirectoryFile(dbPath);
    console.log(`sorry error: ${error}`);
  });

  writeArticleMetaDbStream.on('finish', () => {
    console.log('article-meta.json 生成成功');
  });

  writeArticleListDbStream.on('finish', () => {
    console.log('article-list.json 生成成功');
  });
} catch (e) {
  console.log(e);
}
