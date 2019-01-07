import * as fetch from '../../../common/fetch';
import * as actionTypes from './actionTypes';

export const fetchCategoryList = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_LIST,
    categoryList: fetch.findAllCategory()
  };
};

export const changeCategory = (currentCategory) => {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    currentCategory
  };
};
