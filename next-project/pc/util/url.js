export function makeBlogDataUrlPath({categoryId='', articleId=''}) {
  let path = '';

  if (categoryId) {
    path += `/${'category'}/${encodeURI(categoryId)}`;
  } else {
    path += `/${'category'}/${'all'}`;
  }

  if (articleId) {
    path += `/${'p'}/${encodeURI(articleId)}`;
  }

  return path;
}
