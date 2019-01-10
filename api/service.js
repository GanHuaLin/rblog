const moment = require('moment');
const _ = require('lodash');

let articleMetaData = [];
let articleListData = {};

/**
 * 查询所有文章分类
 * @returns {Array} 返回文章分类的数组
 */
function findAllCategory() {
  let articleTotalCount = 0;
  let categoryList = articleMetaData.map(category => {
    const articleListLength = category.article_list.length;
    articleTotalCount += articleListLength;

    return {
      category_id: category.category_id,
      category_name: category.category_name,
      category_num: articleListLength
    };
  });

  categoryList.unshift({
    category_id: 'all',
    category_name: '全部分类',
    category_num: articleTotalCount
  });

  return categoryList;
}

/**
 * 根据分类名称查询文章列表
 * 1. 如果传入分类名称，查询对应分类的文章列表
 * 2. 如果没有传入分类名称，查询所有文章列表
 * @param categoryId 分类名称
 * @returns {Array} 返回文章列表数组
 */
function findArticleListByCategory(categoryId) {
  let list = [];
  for (let i = 0; i < articleMetaData.length; i++) {
    const category = articleMetaData[i];
    if (!categoryId || (categoryId === 'all')) { // 全部分类
      category.article_list.forEach(article => {
        list.push({
          id: article.id,
          date: article.date,
          title: article.title,
        });
      });

      // 全部分类比较特殊，还需要再次对文章列表进行日期排序
      list.sort((article, nextArticle) => {
        if (article.date === nextArticle.date) {
          return 0;
        } else if (moment(article.date).isBefore(nextArticle.date)) {
          return 1;
        } else {
          return -1;
        }
      });
    } else { // 指定分类
      if (category.category_id === categoryId) {
        list = _.cloneDeep(category.article_list);
        break;
      }
    }
  }

  return list;
}

/**
 * 通过文章 id 获取文章信息
 * @param id 文章标题 id
 * @returns {*} 返回文章信息对象
 */
function findArticleById(id) {
  for (let i = 0; i < articleMetaData.length; i++) {
    const category = articleMetaData[i];
    for (let n = 0; n < category.article_list.length; n++) {
      const article = category.article_list[n];
      if (article.id === id) {
        const newArticle = _.cloneDeep(article);
        newArticle.content = articleListData[id];

        return newArticle;
      }
    }
  }

  return null;
}

module.exports.init = (articleMetaDbData, articleListDbData) => {
  articleMetaData = articleMetaDbData;
  articleListData = articleListDbData;

  return {
    findAllCategory,
    findArticleListByCategory,
    findArticleById
  }
};
