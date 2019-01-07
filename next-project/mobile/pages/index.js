import Layout from '../components/Layout';
import ContentLayout from '../components/ContentLayout';
import IndexHeader from '../components/IndexHeader';
import ArticleList from '../components/ArticleList';

const Index = () => (
  <Layout>
    <IndexHeader />
    <ContentLayout>
      <ArticleList />
    </ContentLayout>
  </Layout>
);

Index.getInitialProps = () => {


  return {

  };
};

export default Index;
