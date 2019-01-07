import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionCreator from '../common/store/actionCreator';
import BScroll from 'better-scroll'
import Link from 'next/link';
import * as COMMON_CONST from '../../common/const';
import moment from 'moment';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.scrollContainerRef = React.createRef();
    this.scroll = null;
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainerRef.current, {
      bindToWrapper: true,
      click: true
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.articleList.length !== this.props.articleList.length) {
      this.scroll.refresh();
    }
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  render() {
    return (
      <div className='container' ref={this.scrollContainerRef}>
        <ul>
          {
            this.props.articleList.map((article, index) => {
              return (
                <Link as={`/p/${article[COMMON_CONST.ARTICLE_DATA_ID_TEXT]}`} href={'/article'} key={index}>
                  <li className='article-item'>
                    <div className="wrapper">
                      <div className="item">
                        <div className='part-left'></div>
                        <div className='part-right'>
                          <div className="date">{moment(article[COMMON_CONST.ARTICLE_DATA_DATE_TEXT]).format('YYYY年MM月DD日')}</div>
                          <div className="title">{article[COMMON_CONST.ARTICLE_DATA_TITLE_TEXT]}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              )
            })
          }
        </ul>

        <style jsx>{`
        @svg 1px-border {
          height: 2px;
          @rect {
            fill: var(--color, black);
            width: 100%;
            height: 50%;
          }
        }

        .container {
          width: 100%;
          height: 100%;
          overflow: hidden;

          ul {
            padding-top: 1.3vh;
            padding-bottom: 3vh;
          }

          .article-item {
            height: 8vh;
            padding: 0 3vw;
            margin-bottom: 1.3vh;

            .wrapper {
              box-shadow: 0 0.3vw 0.6vw rgba(69,18,10,.4);
            }

            .item {
              display: flex;
              height: 100%;
              width: 100%;
              background-color: #fffcf6;
              box-shadow: 0 0 1vw rgba(126,50,0,.1) inset, 0 0.3vw 1vw rgba(58,15,0,.2);

              .part-left {
                width: 6vw;
                background-color: #f6f2ed;

                border-right: 1px solid transparent;
                border-image: svg(1px-border param(--color #e6e1d3)) 2 2 stretch;
              }

              .part-right {
                 width: 88vw;

                .date {
                  height: 3vh;
                  line-height: 3vh;
                  padding-left: 4vw;
                  box-sizing: border-box;
                  font-size: 2.8vw;
                  color: rgb(185, 166, 145);

                  word-break: break-all;
                  overflow-wrap: break-word;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;

                  border-bottom: 1px solid transparent;
                  border-image: svg(1px-border param(--color #e6e1d3)) 2 2 stretch;
                }

                .title {
                  height: 5vh;
                  line-height: 5vh;
                  padding-left: 4vw;
                  font-size: 3.6vw;
                  font-weight: 600;

                  word-break: break-all;
                  overflow-wrap: break-word;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }
          }
        }
      `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['articleList']).toJS()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
