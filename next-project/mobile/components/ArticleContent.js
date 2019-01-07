import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionCreator from '../common/store/actionCreator';
import BScroll from 'better-scroll';
import {withRouter} from "next/dist/lib/router";
import ContentLayout from './ContentLayout';
import ReactMarkdown from 'react-markdown';
import * as COMMON_CONST from "../../common/const";
import * as url from "../../common/url";

class ArticleContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const articleId = url.findPathParameterValue(this.props.router.asPath, COMMON_CONST.URL_PATH_ARTICLE_TEXT);
    this.props.actions.fetchArticle(articleId);
  }

  render() {
    return (
      <ContentLayout>
        <div className="container">
          {
            this.props.article ? (
              <div className="content">
                <h1>文章标题</h1>
                <ReactMarkdown
                  source={this.props.article[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT]}
                  escapeHtml={true}
                  linkTarget='_blank'
                  renderers={{
                    // code: CodeBlock,
                  }}
                />
              </div>
            ) : null
          }
        </div>

        <style>{`

        `}</style>
      </ContentLayout>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    article: state.getIn(['article'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleContent));
