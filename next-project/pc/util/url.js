import * as COMMON_CONST from '../../common/const';

export function findPathParameterValue(path, parameter) {
  if (parameter) {
    const params = decodeURI(path).split('/');
    const parameterIndex = params.indexOf(parameter);

    return parameterIndex !== -1 ? params[parameterIndex + 1] : '';
  }

  return '';
}

export function makeBlogDataUrlPath({categoryId='', articleId=''}) {
  let path = '';

  if (categoryId) {
    path += `/${COMMON_CONST.URL_PATH_CATEGORY_TEXT}/${encodeURI(categoryId)}`;
  } else {
    path += `/${COMMON_CONST.URL_PATH_CATEGORY_TEXT}/${COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME}`;
  }

  if (articleId) {
    path += `/${COMMON_CONST.URL_PATH_ARTICLE_TEXT}/${encodeURI(articleId)}`;
  }

  return path;
}
