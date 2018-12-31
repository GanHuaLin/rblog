import Head from 'next/head';

import Container from '../components/Container';
import Category from '../components/Category';
import ArticleList from '../components/ArticleList';
import Article from '../components/Article';
import {fetch, url} from '../helper'
import * as COMMON_CONST from '../common/const';

const Index = (props) => (
  <Container>
    <Head>
      <title>rbackrock`s blog</title>
    </Head>
    <Category categoryList={props.categoryList} pathParams={props.pathParams} />
    <ArticleList articleList={props.articleList} pathParams={props.pathParams} />
    <Article article={props.article} pathParams={props.pathParams} />
  </Container>
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
  const categoryId = url.findPathParameterValue(asPath, COMMON_CONST.URL_PATH_CATEGORY_TEXT);
  const articleId = url.findPathParameterValue(asPath, COMMON_CONST.URL_PATH_ARTICLE_TEXT);

  const categoryList = fetch.findAllCategory();
  const articleList = fetch.findArticleListByCategory(categoryId);
  let article = null;

  if (articleId) {
    article = fetch.findArticleById(articleId);
  } else {
    if (articleList.length > 0) {
      article = fetch.findArticleById(articleList[0]['id']);
    }
  }

  return {
    pathParams: {
      [COMMON_CONST.URL_PATH_CATEGORY_TEXT]: categoryId,
      [COMMON_CONST.URL_PATH_ARTICLE_TEXT]: articleId,
    },
    categoryList,
    articleList,
    article
  }
};

export default Index;