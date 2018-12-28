const _ = require('lodash');

let articleMeta = {};

try {
  articleMeta = require('./db/article-meta.json');
} catch (e) {
  throw `文章原数据格式异常，请查看 db 目录下生成的数据文件`;
}

/**
 * 导出所有文章分类和文章详情的路径映射
 * @returns {} 所有文章分类和文章详情的路径映射对象
 */
function exportPostPathMap() {
  const page = {page: '/'};
  const pathMap = {
    '/category/all': page
  };
  _.forIn(articleMeta, (val, articleMetaKey) => {
    const category = articleMeta[articleMetaKey];

    // 生成分类路径
    pathMap[`/category/${articleMetaKey}`] = page;

    /* 生成文章路径 */
    category['article_list'].forEach(article => {
      pathMap[`/category/${articleMetaKey}/p/${article.id}`] = page;
      pathMap[`/category/all/p/${article.id}`] = page;
    });
  });

  return pathMap;
}

module.exports = {
  exportPathMap: () => {
    const basePathMap = {
      '/': { page: '/' },
      '/about': { page: '/about' }
    };

    return Object.assign(basePathMap, exportPostPathMap());
  }
};
