import * as fetch from '../../../common/fetch';
import * as actionTypes from './actionTypes';

export const fetchCategoryList = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_LIST,
    categoryList: fetch.findAllCategory()
  };
};

export const showCategoryList = (isShow) => {
  return {
    type: actionTypes.SHOW_CATEGORY_LIST,
    isShow
  }
};

export const fetchArticleList = (categoryId) => {
  return {
    type: actionTypes.FETCH_ARTICLE_LIST,
    articleList: fetch.findArticleListByCategory(categoryId)
  }
};

export const changeCategory = (currentCategory) => {
  return dispatch  => {
    dispatch({
      type: actionTypes.CHANGE_CATEGORY,
      currentCategory
    });

    dispatch(fetchArticleList(currentCategory.category_id));
  }
};
