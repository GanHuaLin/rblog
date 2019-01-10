import Layout from './Layout';
import IndexHeader from './IndexHeader';
import ContentLayout from './ContentLayout';
import ArticleList from './ArticleList';

export default (props) => (
  <Layout>
    <IndexHeader categoryList={props.categoryList} currentCategoryId={props.currentCategoryId} />
    <ContentLayout>
      <ArticleList articleList={props.articleList} currentCategoryId={props.currentCategoryId} />
    </ContentLayout>
  </Layout>
);
