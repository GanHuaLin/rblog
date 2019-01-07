import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultInitialState = fromJS({
  categoryList: [],
  currentCategory: {
    category_id: 'all',
    category_name: '全部分类',
  },
  showCategory: false,

  articleList: [],
  article: null
});

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_LIST:
      return state.set('categoryList', fromJS(action.categoryList));
    case actionTypes.SHOW_CATEGORY_LIST:
      return state.set('showCategory', action.isShow);
    case actionTypes.CHANGE_CATEGORY:
      return state.set('currentCategory', fromJS(action.currentCategory));
    case actionTypes.FETCH_ARTICLE_LIST:
      return state.set('articleList', fromJS(action.articleList));
    case actionTypes.FETCH_ARTICLE:
      return state.set('article', action.article);
    default: return state;
  }
};
