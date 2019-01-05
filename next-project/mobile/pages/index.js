import Layout from '../components/Layout';
import IndexHeader from '../components/IndexHeader';
import ArticleList from '../components/ArticleList';

const Index = () => (
  <Layout>
    <IndexHeader />
    <ArticleList />
  </Layout>
);

Index.getInitialProps = () => {

  return {

  };
};

export default Index;
