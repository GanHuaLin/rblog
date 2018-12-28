const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const shortId = require('shortid');

const postPath = `${process.cwd()}/post`;

/**
 * markdown 文件规则：
 * 1. 任何 markdown 必须隶属一个分类文件夹
 * 2. 分类文件夹必须放在根目录的 post 文件夹下
 * 3. markdown 文件名必须为 [文章标题]-[时间].md 的形式，例如：[Learn JavaScript]-[20181225].md
 *
 * /post 文件夹规则：
 * 1. /post 文件夹下只能有文件夹，不能有任何文件，且该该文件夹表示文章分类
 * 2. /post 文件夹下的分类文件夹里不能再有文件夹
 * 3. /post 文件夹下的分类文件夹里只能放对应分类的文章
 * 4. /post 文件夹下的分类文件夹里不能放除 markdown 以外的任何文件，且 markdown 文件必须要有 .md 后缀名
 *
 * 该方法用于提取 /post 文件夹下的文章，然后根据信息构建特殊结构的文章元数据对象返回
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
 * @returns {null} 扫描 /post 文件夹，构建一个有分类和该分类下所有文章信息的对象并且返回，例如:
 * {'3LTPYxNCLR': {ategory_name: 'Program', article_list: [{"id": "VZIuEcM6Vu", "time": "20181225", "title": "Learn Spring"}]}}
 */

function fetchArticleMeta({filePath=postPath, countLevel=1, maxDirLevel=2, currDirName='', result={}}) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    const postList = [];
    const categoryId = shortId();
    const categoryName = currDirName;

    for (let i = 0; i < files.length; i++) {
      const currFileName = files[i];
      const currFilePath = `${filePath}/${currFileName}`;
      const fileStat = fs.statSync(currFilePath);

      if (fileStat.isDirectory()) {
        if (countLevel < maxDirLevel) {
          fetchArticleMeta({filePath:currFilePath, countLevel: countLevel + 1, currDirName: currFileName, result});
        } else {
          throw 'post 文件夹下有目录超过两层';
        }
      } else if (fileStat.isFile()) {
        const markdownFileNameFormatRegExp = /\[(.{1,})\]-\[(\d{8})\]\.md/g; // 递归代码体中引入比如外部模块会有问题
        const bracketContentFormatRegExp = /\[(.+?)\]/g; // 递归代码体中引入比如外部模块会有问题
        const bracketMatchResult = currFileName.match(bracketContentFormatRegExp) || [];
        let fileNameTitlePartString = '';
        let fileNameDatePartString = '';

        if (bracketMatchResult.length === 2) {
          fileNameTitlePartString = bracketMatchResult[0].replace(bracketContentFormatRegExp, '$1');
          fileNameDatePartString = bracketMatchResult[1].replace(bracketContentFormatRegExp, '$1');
        }

        if (countLevel === 1) {
          if (currFileName !== '.gitignore') {
            throw 'post 文件夹下只能有分类文件夹或者.gitignore文件，不能有除此以外的任何文件';
          }
        } else if (!markdownFileNameFormatRegExp.test(currFileName)) {
          throw 'markdown 文件名称不符合规则';
        } else if (!moment(fileNameDatePartString).isValid()) {
          throw 'markdown 文件名称中日期格式部分格式不正确';
        } else {
          postList.push({
            id: shortId(),
            time: fileNameDatePartString,
            title: fileNameTitlePartString
          });
        }
      }
    }

    if (currDirName) {
      result[categoryId] = {
        category_name: categoryName,
        article_list: postList
      };
    }
    return result;
  } else {
    return null;
  }
}

/**
 * 从硬盘上读取 markdown 文章内容
 * @param articlePath markdown 文件绝对路径
 * @returns {string} 文章内容
 *
 */
function readArticleContent(articlePath) {
  let article = '';
  try {
    article = fs.readFileSync(articlePath, 'utf-8');
    return article;
  }catch (e) {
    if (e.code === 'ENOENT') {
      throw 'markdown 文件没找到'
    } else {
      throw e;
    }
  }
}

/**
 * 该方法根据文章元数据，然后从硬盘读取 markdown 文章内容，构建特殊结构的对象返回
 * @param articleMeta 文章的元数据，fetchArticleMeta 的返回值
 */
function fetchArticleList(articleMeta) {
  const articleList = {};
  forInArticleList(articleMeta, (val, articleMetaKey, article) => {
    articleList[article.id] = readArticleContent(`${postPath}/${articleMeta[articleMetaKey]['category_name']}/[${article.title}]-[${article.time}].md`);
  });

  return articleList;
}

/**
 * 根据时间排序文章列表
 * @param articleList 文章列表
 */
function sortArticleByTime(articleList) {
  articleList.sort((article, nextArticle) => {
    if (article.time === nextArticle.time) {
      return 0;
    } else if (moment(article.time).isBefore(nextArticle.time)) {
      return 1;
    } else {
      return 0;
    }
  });
}

/**
 * 清洗文章元数据
 * 当前清洗功能
 * 1. 按照时间对文章列表排序，最新的文章排最前
 * @param articleMeta 文章元数据
 */
function clearArticleMetaData(articleMeta) {
  _.forIn(articleMeta, (val, articleMetaKey) => {
    sortArticleByTime(articleMeta[articleMetaKey].article_list);
  });
}

/**
 * 对任何循环文章元数据中的所有文章列表做想做的事情
 * @param articleMeta 文章元数据
 * @param func 想做的事情
 */
function forInArticleList(articleMeta, func) {
  _.forIn(articleMeta, (val, articleMetaKey) => {
    articleMeta[articleMetaKey].article_list.forEach(article => {
      func(val, articleMetaKey, article);
    });
  });
}

/**
 * 删除指定文件夹下所有文件
 * @param path 要删除文件夹的路径
 * @param countLevel 文件夹层级
 */
function removeDirectoryFile(path, countLevel=1) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    files.forEach(fileName => {
      const currFilePath = `${path}/${fileName}`;
      if (fs.statSync(currFilePath).isDirectory()) {
        removeDirectoryFile(currFilePath, countLevel + 1);
      } else {
        fs.unlinkSync(currFilePath);
      }
    });

    if (countLevel !== 1) {
      fs.rmdirSync(path);
    }
  }
}

module.exports = {
  fetchArticleMeta,
  fetchArticleList,
  clearArticleMetaData,
  forInArticleList,
  removeDirectoryFile
};
