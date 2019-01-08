import React, { Component } from 'react';
import Layout from '../components/Layout';
import AboutHeader from '../components/AboutHeader';
import AboutContent from '../components/AboutContent';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <AboutHeader />
        <AboutContent />
      </Layout>
    );
  }
}

export default About;
