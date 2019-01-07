export function findPathParameterValue(path, parameter) {
  if (parameter) {
    const params = decodeURI(path).split('/');
    const parameterIndex = params.indexOf(parameter);

    return parameterIndex !== -1 ? params[parameterIndex + 1] : '';
  }

  return '';
}
