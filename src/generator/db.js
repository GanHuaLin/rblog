const fs = require('fs');
const helper = require('./helper');
const util = require('../common/util');

const dbPath = `${process.cwd()}/db`;
const ARTICLE_META_FILE_NAME = 'article-meta.json';
const ARTICLE_LIST_FILE_NAME = 'article-list.json';

function generateArticleMetaDb(articleMeta) {
  const writeArticleMetaDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_META_FILE_NAME}`);
  writeArticleMetaDbStream.end(JSON.stringify(articleMeta));

  return new Promise((resolve, reject) => {
    writeArticleMetaDbStream.on('finish', resolve);
    writeArticleMetaDbStream.on('error', () => {
      util.removeDirectoryFile(dbPath, ['.gitignore']);
      reject();
    });
  });
}

function generateArticleListDb (articleList) {
  const writeArticleListDbStream = fs.createWriteStream(`${dbPath}/${ARTICLE_LIST_FILE_NAME}`);
  writeArticleListDbStream.end(JSON.stringify(articleList));

  return new Promise((resolve, reject) => {
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
