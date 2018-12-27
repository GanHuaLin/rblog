const fs = require('fs');
const path = require('path');

/**
 * markdown 文件规则：
 * 1. 任何 markdown 必须隶属一个分类文件夹
 * 2. 分类文件夹必须放在根目录的 post 文件夹下
 * 3. markdown 文件名必须为 [文章标题]-时间.md 的形式，例如：[Learn JavaScript]-20181225.md
 *
 * /post 文件夹规则：
 * 1. /post 文件夹下只能有文件夹，不能有任何文件，且该该文件夹表示文章分类
 * 2. /post 文件夹下的分类文件夹里不能再有文件夹
 * 3. /post 文件夹下的分类文件夹里只能放对应分类的文章
 * 4. /post 文件夹下的分类文件夹里不能放除 markdown 以外的任何文件，且 markdown 文件必须要有 .md 后缀名
 *
 * 该方法用于提取 /post 文件夹下的文章，然后根据信息构建特殊结构的对象然后返回
 *
 * 如下返回值有特殊含义：
 * 1. 空对象 {} 表示有分类文件夹但是该分类下没有文章
 * 2. null 表示 /post 文件夹有不符合规则文件，包括 markdown 文件名称不符合规则
 *
 * @param filePath 文件路径
 * @param countLevel 文件夹层级
 * @param maxDirLevel 最大文件夹层级
 * @param currDirName 当前文件夹名称
 * @param result 当前分类下文章信息构建体对象
 * @returns {null} 扫描 /post 文件夹，构建一个有分类和该分类下所有文章信息的对象并且返回，例如: {"program": ["[Learn Java]-20181225.md" , "[Learn JavaScript]-20181225.md"]}
 */
exports.fetchPostMeta = ({filePath, countLevel=1, maxDirLevel=2, currDirName='', result={}}) => {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    const postList = [];
    const markdownFileNameFormatReg = /\[\S+]-\d{8}.md/g;

    for (let i = 0; i < files.length; i++) {
      const currFileName = files[i];
      const currFilePath = `${filePath}/${currFileName}`;
      const fileStat = fs.statSync(currFilePath);

      if (fileStat.isDirectory()) {
        if (countLevel < maxDirLevel) {
          if (!fetchPostMeta({filePath:currFilePath, countLevel: countLevel + 1, currDirName: currFileName, result})) {
            return null;
          }
        } else {
          return null;
        }
      } else if (fileStat.isFile()) {
        if (!markdownFileNameFormatReg.test(currFileName)) {
          return null;
        } else if (path.extname(currFileName) !== '.md') {
          return null;
        } else if (countLevel === 1) {
          return null;
        } else {
          postList.push(currFileName);
        }
      }
    }

    if (currDirName) {
      result[`${currDirName}`] = postList;
    }
    return result;
  } else {
    return null;
  }
};
