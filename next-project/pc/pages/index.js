import Layout from '../components/Layout';
import NoteContent from '../components/NoteContent';
import * as commonUrl from '../../common/url';

const server = require('../../../api/service');
let articleMetaData = [];
let articleListData = {};

try {
  articleMetaData = require('../../../db/article-meta.json');
  articleListData = require('../../../db/article-list.json');
} catch (e) {
  console.log(e);
  throw `文章原数据格式异常，请查看 db 目录下生成的数据文件`;
}

const Index = (props) => (
  <Layout>
    <NoteContent
      categoryList={props.categoryList}
      articleList={props.articleList}
      article={props.article}
      pathParams={props.pathParams}
    />
  </Layout>
);

/**
 *
 * 博客只使用了 index 和 about 两个页面，页面中文章所有数据依赖 URL 地址信息来获取
 * 博客整体内容区域分为3个部分
 *
 * 分类列表：不管点分类还是具体文章，分类列表数据都是一致的
 * 文章列表：数据依赖于 URL 中关于 category 的值
 * 文章内容：数据依赖于 URL 中关于 p 的值
 *
 * 博客 URL 有如下类型：
 * http://ip:port 首页
 * http://ip:port/category/[分类id] 当点击分类列表某一分类链接时
 * http://ip:port/category/[分类id]/p/[文章id] 当点击文章列表某一具体文章链接时
 * http://ip:port/about 当点击"关于"链接时
 *
 * 特殊的 URL 类型：
 * http://ip:port/category/all 当点击分类列表中"全部"分类链接时
 * http://ip:port/category/all/p/[文章id] 在"全部"分类的情况下，点击文章列表某一具体文章链接时
 *
 */
Index.getInitialProps = ({asPath}) => {
  const fetch = server.init(articleMetaData, articleListData);
  const categoryId = commonUrl.findPathParameterValue(asPath, 'category');
  const articleId = commonUrl.findPathParameterValue(asPath, 'p');
  const categoryList = fetch.findAllCategory();
  const articleList = fetch.findArticleListByCategory(categoryId || 'all');

  let article = null;
  if (articleId) {
    article = fetch.findArticleById(articleId);
  } else {
    if (articleList.length > 0) {
      article = fetch.findArticleById(articleList[0].id);
    }
  }

  return {
    pathParams: {
      category: categoryId,
      p: articleId,
    },
    categoryList,
    articleList,
    article
  }
};

export default Index;
