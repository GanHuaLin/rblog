import * as actionTypes from './actionTypes';

export const fetchArticleList = (articleList) => ({
  type: actionTypes.ARTICLE_META_LIST,
  articleList: articleList
});
