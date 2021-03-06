let articleMetaData = [];

try {
  articleMetaData = require('../../db/article-meta.json');
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

  articleMetaData.forEach(category => {
    // 生成分类路径
    pathMap[`/category/${category.category_id}`] = page;

    // 生成文章路径
    category.article_list.forEach(article => {
      pathMap[`/category/${category.category_id}/p/${article.id}`] = page;
      pathMap[`/category/all/p/${article.id}`] = page;
    });
  });

  return pathMap;
}

module.exports = {
  exportPathMap: async (defaultPathMap) => {
    defaultPathMap['/404.html'] = { page: '/_error' };

    const basePathMap = {
      '/': { page: '/' },
      '/about': { page: '/about' }
    };

    return Object.assign({}, defaultPathMap, basePathMap, await exportPostPathMap());
  },
};
