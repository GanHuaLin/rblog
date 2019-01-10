import Layout from '../components/Layout';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';

export default (props) => (
  <Layout>
    <ArticleHeader />
    <ArticleContent article={props.article} />
  </Layout>
);
