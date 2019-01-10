export function findPathParameterValue(path, parameter) {
  if (parameter) {
    const params = decodeURI(path).split('/');
    const parameterIndex = params.indexOf(parameter);

    return parameterIndex !== -1 ? params[parameterIndex + 1] : '';
  }

  return '';
}

export function existPathName(path, name) {
  let exist = false;
  if (path && name) {
    path.indexOf(`/${name}`) !== -1 ? exist = true : exist = false;
  }

  return exist;
}
