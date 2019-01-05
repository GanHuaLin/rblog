import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultInitialState = fromJS({
  articleList: []
});

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLE_META_LIST:
      return state.set('articleList', fromJS(action.articleList));
    default: return state;
  }
};
