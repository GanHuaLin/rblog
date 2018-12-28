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

module.exports = {
  removeDirectoryFile
};
