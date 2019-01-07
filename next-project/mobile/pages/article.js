import React, { Component } from 'react';
import Layout from '../components/Layout';
import ArticleHeader from '../components/ArticleHeader';
import ArticleContent from '../components/ArticleContent';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <ArticleHeader />
        <ArticleContent />
      </Layout>
    );
  }
}

export default Article;
