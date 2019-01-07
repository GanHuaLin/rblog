import _ from 'lodash';
import moment from 'moment';
import * as COMMON_CONST from './const';

let articleMetaData = {};
let articleListData = {};

try {
  articleMetaData = require('../../db/article-meta.json');
  articleListData = require('../../db/article-list.json');
} catch (e) {
  console.log(e);
  throw `文章原数据格式异常，请查看 db 目录下生成的数据文件`;
}

/**
 * 查询所有文章分类
 * @returns {Array} 返回文章分类的数组
 */
export function findAllCategory() {
  let articleTotalCount = 0;
  let categoryList = articleMetaData.map(category => {
    const articleListLength = category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].length;
    articleTotalCount += articleListLength;

    return {
      [COMMON_CONST.CATEGORY_DATA_ID_TEXT]: category[COMMON_CONST.CATEGORY_DATA_ID_TEXT],
      [COMMON_CONST.CATEGORY_DATA_NAME_TEXT]: category[COMMON_CONST.CATEGORY_DATA_NAME_TEXT],
      [COMMON_CONST.CATEGORY_DATA_ARTICLE_NUM_TEXT]: articleListLength
    };
  });

  categoryList.unshift({
    [COMMON_CONST.CATEGORY_DATA_ID_TEXT]: COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME,
    [COMMON_CONST.CATEGORY_DATA_NAME_TEXT]: COMMON_CONST.CATEGORY_DATA_ALL_NAME,
    [COMMON_CONST.CATEGORY_DATA_ARTICLE_NUM_TEXT]: articleTotalCount
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
  for (let i = 0; i < articleMetaData.length; i++) {
    const category = articleMetaData[i];
    if (!categoryId || (categoryId === COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME)) { // 全部分类
      category[COMMON_CONST.CATEGORY_DATA_ARTICLE_LIST_TEXT].forEach(article => {
        list.push({
          [COMMON_CONST.ARTICLE_DATA_ID_TEXT]: article[COMMON_CONST.ARTICLE_DATA_ID_TEXT],
          [COMMON_CONST.ARTICLE_DATA_DATE_TEXT]: article[COMMON_CONST.ARTICLE_DATA_DATE_TEXT],
          [COMMON_CONST.ARTICLE_DATA_TITLE_TEXT]: article[COMMON_CONST.ARTICLE_DATA_TITLE_TEXT],
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
 * @param id 文章标题 id
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
