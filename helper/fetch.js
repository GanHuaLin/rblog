import _ from 'lodash';
import * as COMMON_CONST from '../common/const';

let data = {};
let articleData = {};

try {
  data = require('../db/article-meta.json');
  articleData = require('../db/article-list.json');
} catch (e) {
  throw `文章原数据格式异常，请查看 db 目录下生成的数据文件`;
}

/**
 * 查询所有文章分类
 * @returns {Array} 返回文章分类的数组
 */
export function findAllCategory() {
  const categoryList = [];
  let categoryListCount = 0;

  _.forIn(data, (val, categoryId) => {
    const currCategory = {};
    const currCategoryArticleCount = data[categoryId][COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].length;

    currCategory.id = categoryId;
    currCategory.name = data[categoryId][COMMON_CONST.CATEGORY_DATA_NAME_TEXT];
    currCategory.num = currCategoryArticleCount;
    categoryList.push(currCategory);

    categoryListCount += currCategoryArticleCount;
  });

  // 特殊，文章数据中没有全部分类，通过程序自行添加，并且永远排第一位
  categoryList.unshift({
    id: COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME,
    name: COMMON_CONST.CATEGORY_DATA_ALL_NAME,
    num: categoryListCount
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
export function findArticleListByCategory(categoryId) {
  let list = [];

  if (!categoryId || (categoryId === COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME)) {
    _.forIn(data, (val, currCategoryId) => {
      data[currCategoryId][COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].map(item => {
        list.push({
          [COMMON_CONST.ARTICLE_DATA_ID_TEXT]: item[COMMON_CONST.ARTICLE_DATA_ID_TEXT],
          [COMMON_CONST.ARTICLE_DATA_TIME_TEXT]: item[COMMON_CONST.ARTICLE_DATA_TIME_TEXT],
          [COMMON_CONST.ARTICLE_DATA_TITLE_TEXT]: item[COMMON_CONST.ARTICLE_DATA_TITLE_TEXT],
        })
      });
    });
  } else {
    list = _.cloneDeep(data[categoryId][COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT]);
  }

  return list;
}

/**
 * 通过文章 id 获取文章信息
 * @param id 文章标题
 * @returns {*} 返回文章信息对象
 */
export function findArticleById(id) {
  const categoryList = _.keys(data);

  for (let i = 0; i < categoryList.length; i++) {
    for (let n = 0, currArticle = {}; n < data[categoryList[i]][COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].length; n++) {
      currArticle = data[categoryList[i]][COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT][n];
      if (currArticle[COMMON_CONST.ARTICLE_DATA_ID_TEXT] === id) {
        const article = _.cloneDeep(currArticle);
        article[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT] = articleData[id];

        return article;
      }
    }
  }

  return null;
}
