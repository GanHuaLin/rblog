const fs = require('fs');
const helper = require('./common/helper');
const util = require('./common/util');

const dbPath = `${process.cwd()}/db`;
const ARTICLE_META_FILE_NAME = 'article-meta.json';
const ARTICLE_LIST_FILE_NAME = 'article-list.json';

function generateArticleMetaDb(articleMeta) {
  return new Promise((resolve, reject) => {
    const writeArticleMetaDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_META_FILE_NAME}`);
    writeArticleMetaDbStream.write(JSON.stringify(articleMeta));

    writeArticleMetaDbStream.end();
    writeArticleMetaDbStream.on('finish', resolve);
    writeArticleMetaDbStream.on('error', () => {
      util.removeDirectoryFile(dbPath, ['.gitignore']);
      reject();
    });
  });
}

function generateArticleListDb (articleList) {
  return new Promise((resolve, reject) => {
    const writeArticleListDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_LIST_FILE_NAME}`);
    writeArticleListDbStream.write(JSON.stringify(articleList));

    writeArticleListDbStream.end();
    writeArticleListDbStream.on('finish', resolve);
    writeArticleListDbStream.on('error', () => {
      util.removeDirectoryFile(dbPath, ['.gitignore']);
      reject();
    });
  });
}

exports.run = () => {
  const articleMetaAndListCombine = helper.fetchArticleMetaAndList();
  return Promise.all([
    generateArticleMetaDb(articleMetaAndListCombine.articleMeta),
    generateArticleListDb(articleMetaAndListCombine.articleList)
  ]);
};
