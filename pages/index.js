import {fetch} from '../helper';

import Container from '../components/Container';
import Category from '../components/Category';
import ArticleList from '../components/ArticleList';
import Content from '../components/Content';

const Index = (props) => (
  <Container>
    <Category categoryList={props.categoryList} />
    <ArticleList articleList={props.articleList} />
    <Content articleContent={props.articleContent} />
  </Container>
);

Index.getInitialProps = ({pathname, query, asPath}) => {
  console.log(pathname);
  console.log(query);
  console.log(asPath);
  console.log('---');

  return {
    categoryList: fetch.findAllCategory(),
    articleList: fetch.findArticleListByCategory(query['category']),
    articleContent: fetch.findArticleByTitle(query['title'])
  };
};

export default Index;
