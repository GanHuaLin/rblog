const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');
const shortHash = require('short-hash');

const postPath = `${process.cwd()}/_post`;

/**
 * markdown 文件规则：
 * 1. 任何 markdown 必须隶属一个分类文件夹
 * 2. 分类文件夹必须放在根目录的 _post 文件夹下
 * 3. markdown 文件名必须为 [文章标题]-[时间].md 的形式，例如：[Learn JavaScript]-[20181225].md
 *
 * /_post 文件夹规则：
 * 1. /_post 文件夹下只能有文件夹，不能有任何文件，且该该文件夹表示文章分类
 * 2. /_post 文件夹下的分类文件夹里不能再有文件夹
 * 3. /_post 文件夹下的分类文件夹里只能放对应分类的文章
 * 4. /_post 文件夹下的分类文件夹里不能放除 markdown 以外的任何文件，且 markdown 文件必须要有 .md 后缀名
 *
 * 该方法有两个功能：
 * 1. 用于提取 /_post 文件夹下的文章，然后根据信息构建特殊结构的文章元数据对象返回
 * 2. 验证 /_post 文件夹下的文章是否合法
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
 * @returns {null} 扫描 /_post 文件夹，构建一个有分类和该分类下所有文章信息的对象并且返回，例如:
    [
      {
        "category_id": "7c6b63a3",
        "category_name": "Program",
        "article_list": [
          {
            "id": "eb52d9c3",
            "time": "20181228",
            "title": "test"
          }
        ]
      }
    ]
 */
function fetchArticleMeta({filePath=postPath, countLevel=1, maxDirLevel=2, currDirName='', result=[]}={}) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    const postList = [];
    const categoryName = currDirName;
    const categoryId = shortHash(categoryName);

    for (let i = 0; i < files.length; i++) {
      const currFileName = files[i];
      const currFilePath = `${filePath}/${currFileName}`;
      const fileStat = fs.statSync(currFilePath);

      if (fileStat.isDirectory()) {
        if (countLevel < maxDirLevel) {
          fetchArticleMeta({filePath:currFilePath, countLevel: countLevel + 1, currDirName: currFileName, result});
        } else {
          throw '_post文件夹下目录不能超过两层';
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
            throw `${currFileName}不合法 _post 文件夹下只能有分类文件夹或者.gitignore文件，不能有除此以外的任何文件`;
          }
        } else if (!markdownFileNameFormatRegExp.test(currFileName)) {
          throw `${currFileName}不合法 markdown 文件名称不符合规则`;
        } else if (!moment(fileNameDatePartString).isValid()) {
          throw `${currFileName}不合法 markdown 文件名称中日期格式不正确`;
        } else {
          postList.push({
            id: shortHash(fileNameDatePartString + fileNameTitlePartString),
            time: fileNameDatePartString,
            title: fileNameTitlePartString
          });
        }
      }
    }

    if (currDirName) {
      result.push({
        category_id: categoryId,
        category_name: categoryName,
        article_list: postList
      });
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
 * 同时还获取文章元数据和列表对象
 * @returns {{articleList, articleMeta: *}} {文章列表对象，文章元数据对象}
 */
function fetchArticleMetaAndList() {
  const articleMeta = this.fetchArticleMeta();
  this.clearArticleMetaData(articleMeta);
  const articleList = this.fetchArticleList(articleMeta);

  return {
    articleMeta,
    articleList
  }
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
      return -1;
    }
  });
}

function sortCategoryByArticleCount(category) {
  category.sort((category, nextCategory) => {
    if (category.article_list.length === nextCategory.article_list.length) {
      return 0;
    } else if (category.article_list.length < nextCategory.article_list.length) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 清洗文章元数据
 * 当前清洗功能
 * 1. 按照分类中文章的数量进行分类排序，最多的文章排最前
 * 2. 按照时间对文章列表排序，最新的文章排最前
 * @param articleMeta 文章元数据
 */
function clearArticleMetaData(articleMeta) {
  sortCategoryByArticleCount(articleMeta);

  articleMeta.forEach(category => {
    sortArticleByTime(category.article_list);
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
 * 判断文章元数据和文章列表数据文件是否存在
 * @returns {boolean} 存在返回 true 否则 false
 */
function isExistArticleMetaAndListFile() {
  const dbPath = `${process.cwd()}/db`;
  const articleMetaPath = `${dbPath}/article-meta.json`;
  const articleListPath = `${dbPath}/article-list.json`;

  return fs.existsSync(articleMetaPath) && fs.existsSync(articleListPath);
}

function existArticleMetaAndListAfter(afterFunc) {
  if (isExistArticleMetaAndListFile()) {
    afterFunc();
  } else {
    print.info(`请先使用 npm run generate 命令构建文章相关数据`);
  }
}

module.exports = {
  fetchArticleMeta,
  fetchArticleList,
  fetchArticleMetaAndList,
  clearArticleMetaData,
  forInArticleList,
  isExistArticleMetaAndListFile,
  existArticleMetaAndListAfter,
};
