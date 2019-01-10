import CategoryPage from '../components/CategoryPage';
import ArticlePage from '../components/ArticlePage';
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

const CATEGORY_PAGE = 1;
const ARTICLE_PAGE = 2;

const Index = (props) => {
  let currPage = null;
  if (props.currPageType === CATEGORY_PAGE) {
    currPage = <CategoryPage currentCategoryId={props.currentCategoryId} categoryList={props.categoryList} articleList={props.articleList} />
  } else if (props.currPageType === ARTICLE_PAGE) {
    currPage = <ArticlePage article={props.article} />
  }

  return currPage;
};

Index.getInitialProps = ({asPath}) => {
  const fetch = server.init(articleMetaData, articleListData);
  const categoryId = commonUrl.findPathParameterValue(asPath, 'category') || 'all';
  const articleId = commonUrl.findPathParameterValue(asPath, 'p');
  const returnProps = {
    currPageType: CATEGORY_PAGE
  };


  if (commonUrl.existPathName(asPath, 'p')) {
    returnProps.currPageType = ARTICLE_PAGE;
    returnProps.article = fetch.findArticleById(articleId);
  } else if ((asPath === '/') || (commonUrl.existPathName(asPath, 'category'))) {
    const categoryList = fetch.findAllCategory();
    const articleList = fetch.findArticleListByCategory(categoryId);

    returnProps.categoryList = categoryList;
    returnProps.currentCategoryId = categoryId;
    returnProps.articleList = articleList;
  }

  return returnProps;
};

export default Index;
