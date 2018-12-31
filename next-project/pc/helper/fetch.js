import _ from 'lodash';
import * as COMMON_CONST from '../common/const';

let articleMetaData = {};
let articleListData = {};

try {
  articleMetaData = require('../../../db/article-meta.json');
  articleListData = require('../../../db/article-list.json');
} catch (e) {
  console.log(e);
  throw `文章原数据格式异常，请查看 db 目录下生成的数据文件`;
}

/**
 * 查询所有文章分类
 * @returns {Array} 返回文章分类的数组
 */
export function findAllCategory() {
  let articleCount = 0;
  let categoryList = articleMetaData.map(category => {
    articleCount++;
    return {
      id: category[COMMON_CONST.CATEGORY_DATA_ID_TEXT],
      name: category[COMMON_CONST.CATEGORY_DATA_NAME_TEXT],
      num: category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].length
    };
  });

  categoryList.unshift({
    id: COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME,
    name: COMMON_CONST.CATEGORY_DATA_ALL_NAME,
    num: articleCount
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
  let list =[];
  for (let i = 0; i < articleMetaData.length; i++) {
    const category = articleMetaData[i];
    if (!categoryId || (categoryId === COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME)) {
      category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].forEach(article => {
        list.push({
          [COMMON_CONST.ARTICLE_DATA_ID_TEXT]: article[COMMON_CONST.ARTICLE_DATA_ID_TEXT],
          [COMMON_CONST.ARTICLE_DATA_TIME_TEXT]: article[COMMON_CONST.ARTICLE_DATA_TIME_TEXT],
          [COMMON_CONST.ARTICLE_DATA_TITLE_TEXT]: article[COMMON_CONST.ARTICLE_DATA_TITLE_TEXT],
        });
      });
    } else {
      if (category[COMMON_CONST.CATEGORY_DATA_ID_TEXT] === categoryId) {
        list = _.cloneDeep(category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT]);
        break;
      }
    }
  }

  return list;
}

/**
 * 通过文章 id 获取文章信息
 * @param id 文章标题
 * @returns {*} 返回文章信息对象
 */
export function findArticleById(id) {
  for (let i = 0; i < articleMetaData.length; i++) {
    const category = articleMetaData[i];
    for (let n = 0; n < category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].length; n++) {
      const article = category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT][n];
      if (article[COMMON_CONST.ARTICLE_DATA_ID_TEXT] === id) {
        const newArticle = _.cloneDeep(article);
        newArticle[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT] = articleListData[id];

        return newArticle;
      }
    }
  }

  return null;
}
