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

    this.scroll = React.createRef();
    this.wrapperRef = React.createRef();
    this.scrollWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollWrapperRef.current, {
      bindToWrapper: true,
    });

    const articleId = url.findPathParameterValue(this.props.router.asPath, COMMON_CONST.URL_PATH_ARTICLE_TEXT);
    this.props.actions.fetchArticle(articleId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.article !== this.props.article) {
      this.scroll.refresh();

      if (this.wrapperRef.current) {
        this.wrapperRef.current.style.opacity = '1';
      }
    }
  }

  render() {
    return (
      <ContentLayout>
        <div className="container" >
          {
            !this.props.article ? <div className="loading"><span className="text">Loading...</span></div> : null
          }

          <div className="wrapper" ref={this.wrapperRef}>
            <div className="scroll-wrapper" ref={this.scrollWrapperRef}>
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
                ) : <div className="no-content"></div>
              }
            </div>
          </div>
        </div>

        <style jsx>{`
          .container {
            height: 100%;
            position: relative;
            background-color: #fffcf6;

            .wrapper {
              height: 100%;
              opacity: 0;
              transition: opacity .3s ease-out;
            }

            .scroll-wrapper {
              height: 100%;
              overflow: hidden;
            }

            .content {
              padding: 2vh 6vw;
              font-size: 4.3vw;
              line-height: 8vw;
              word-break: break-word!important;
              font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
            }
          }

          .loading {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;

            .text {
              font-size: 8vw;
              animation: blink 1.3s infinite;
            }
          }

          @keyframes blink {
            0% { opacity:1; }
            50% { opacity:0; }
            100% { opacity:1; }
          }
          @-webkit-keyframes blink {
            0% { opacity:1; }
            50% { opacity:0; }
            100% { opacity:1; }
          }
          @-moz-keyframes blink {
            0% { opacity:1; }
            50% { opacity:0; }
            100% { opacity:1; }
          }
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
