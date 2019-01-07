import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultInitialState = fromJS({
  categoryList: [],
  currentCategory: {
    category_id: 'all',
    category_name: '全部分类',
  },
});

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_LIST:
      return state.set('categoryList', fromJS(action.categoryList));
    case actionTypes.CHANGE_CATEGORY:
      return state.set('currentCategory', fromJS(action.currentCategory));
    default: return state;
  }
};
