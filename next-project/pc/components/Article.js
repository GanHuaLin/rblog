import React, { Component } from 'react';
import * as COMMON_CONST from '../common/const';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './markdown/CodeBlock';
import BScroll from "better-scroll";

class Article extends Component {
  constructor(props) {
    super(props);

    this.scrollContainerRef = React.createRef();
    this.contentRef = React.createRef();
    this.scroll = null;
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainerRef.current, {
      mouseWheel: true,
      scrollbar: {
        fade: false,
        interactive: true
      },
      bounce: false,
      bindToWrapper: true,
      // preventDefault: false,
      // autoBlur: false,
      // disableMouse: true,
    });

    this.toggleScrollBar(false, false);
    if (this.contentRef.current) {
      this.contentRef.current.style.opacity = 1;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.contentRef.current) {
      this.contentRef.current.style.opacity = 1;
    }
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  onArticleMouseEnterHandle = () => {
    this.toggleScrollBar(true);
  };

  onArticleMouseLeaveHandle = () => {
    this.toggleScrollBar(false);
  };

  toggleScrollBar(toggle, isTransition=true) {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
      if (isTransition) {
        this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
      }
    }
  }

  render() {
    return (
      <div className='article'>
        <div className='wrapper' ref={this.scrollContainerRef} onMouseEnter={this.onArticleMouseEnterHandle} onMouseLeave={this.onArticleMouseLeaveHandle}>
          {
            <div className="container" >
              {
                this.props.article ? (
                  <div className="content" >
                    <div className='md-content' ref={this.contentRef} style={{opacity: 0}}>
                      <ReactMarkdown
                        source={this.props.article[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT]}
                        escapeHtml={true}
                        renderers={{
                          code: CodeBlock,
                        }}
                      />
                    </div>
                  </div>
                ) : null
              }
            </div>
          }
        </div>

        <style jsx>{`
        .article {
          flex: 61;
          height: 100%;
        }

        .wrapper {
          height: 100%;
          position: relative;
        }

        .container {
          background: #FFFCF7 url(/static/img/grid.jpg) left top;
        }

        .content {
          min-height: 95vh;
          overflow: hidden;
          padding: 0 30px 0px 50px;
          color: #635752;
          line-height: 50px;
          font-size: 17px;
          background: url(/static/img/note_detail_edge.jpg) repeat-y;
        }

        .md-content {
          transition: opacity .3s ease-out;
        }

        .md-content:after {
          display: block;
          content: ' ';
          height: 50px;
        }
      `}</style>
      </div>
    )
  }
}

export default Article;
