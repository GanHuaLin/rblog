const fs = require('fs');

/**
 * 删除指定文件夹下所有文件
 * @param path 要删除文件夹的路径
 * @param ignoreFile 指定忽略的文件名，这些文件会被忽略不被删除
 * @param countLevel 文件夹层级
 */
function removeDirectoryFile(path, ignoreFile=[], countLevel=1) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    files.forEach(fileName => {
      const currFilePath = `${path}/${fileName}`;
      if (fs.statSync(currFilePath).isDirectory()) {
        removeDirectoryFile(currFilePath, countLevel + 1);
      } else {
        if (ignoreFile.indexOf(fileName) === -1) {
          fs.unlinkSync(currFilePath);
        }
      }
    });

    if (countLevel !== 1) {
      fs.rmdirSync(path);
    }
  }
}

/**
 * 截取文件 path 路径
 * @param fullFileName 要截取文件的全 path 字符串
 * @param startPath 要开始截取的 path 字符串
 * @returns {string} 截取后的字符串
 */
function subFullFileNamePath(fullFileName, startPath) {
  const startPathIndex = fullFileName.indexOf(startPath);
  if (startPathIndex !== -1) {
    return fullFileName.substr(startPathIndex, fullFileName.length);
  }

  return '';
}

module.exports.removeDirectoryFile = removeDirectoryFile;
module.exports.subFullFileNamePath = subFullFileNamePath;
