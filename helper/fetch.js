import data from '../data';
import _ from 'lodash';

/**
 * 查询所有文章分类
 * @returns {Array} 返回文章分类的数组
 */
export function findAllCategory() {
  const categoryList = [];

  _.forIn(data, (val, category) => {
    const currCategory = {};
    currCategory.name = category;
    currCategory.num = data[category].length;
    categoryList.push(currCategory);
  });

  return categoryList;
}

/**
 * 根据分类名称查询文章列表
 * 1. 如果传入分类名称，查询对应分类的文章列表
 * 2. 如果没有传入分类名称，查询所有文章列表
 * @param category 分类名称
 * @returns {Array} 返回文章列表数组
 */
export function findArticleListByCategory(category) {
  let list = [];

  if (category) {
    list = data[category].map(item => ({'time': item.time, title: item.title}));
  } else {
    _.forIn(data, (val, key) => {
      data[key].map(item => list.push({'time': item.time, title: item.title}));
    });
  }

  return list;
}

/**
 * 通过文章标题获取文章信息
 * @param title 文章标题
 * @returns {*} 返回文章信息对象
 */
export function findArticleByTitle(title) {
  const categoryList = _.keys(data);

  for (let i = 0; i < categoryList.length; i++) {
    for (let n = 0, currArticle = {}; n < data[categoryList[i]].length; n++) {
      currArticle = data[categoryList[i]][n];
      if (currArticle.title === title) {
        return currArticle;
      }
    }
  }

  return null;
}
