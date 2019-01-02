import Link from 'next/link';
import React, { Component } from 'react';
import BScroll from "better-scroll";
import moment from 'moment';
import * as COMMON_CONST from '../common/const';
import {url} from '../helper';

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.scrollContainerRef = React.createRef();
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
      bindToWrapper: true
    });

    this.toggleScrollBar(false, false);
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  onArticleListMouseEnterHandle = () => {
    this.toggleScrollBar(true);
  };

  onArticleListMouseLeaveHandle = () => {
    this.toggleScrollBar(false);
  };

  toggleScrollBar(toggle, isTransition=true) {
    this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
    if (isTransition) {
      this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
    }
  }

  isOnArticleListItemStyleClass = (path, id, index) => {
    if ((path === id) || (!path && (index === 0))) {
      return 'on-item'
    }

    return '';
  };

  render() {
    return (
      <div className='article-list' ref={this.scrollContainerRef} onMouseEnter={this.onArticleListMouseEnterHandle} onMouseLeave={this.onArticleListMouseLeaveHandle}>
        {
          <ul className='list-wrapper'>
            {
              this.props.articleList && (this.props.articleList.length > 0) ? ((
                this.props.articleList.map((article, index) => (
                  <li className={`item ${this.isOnArticleListItemStyleClass(this.props['pathParams'][COMMON_CONST.URL_PATH_ARTICLE_TEXT], article[COMMON_CONST.ARTICLE_DATA_ID_TEXT], index)}`} key={index}>
                    {
                      <Link as={
                        `${url.makeBlogDataUrlPath({
                          categoryId: this.props.pathParams[COMMON_CONST.URL_PATH_CATEGORY_TEXT], articleId: article[COMMON_CONST.ARTICLE_DATA_ID_TEXT]})}`}
                            href={'/'}
                      >
                        <div className="article-info" >
                          <div className="date">{moment(article[COMMON_CONST.ARTICLE_DATA_DATE_TEXT]).format('YYYY年MM月DD日')}</div>
                          <div className="title">{article[COMMON_CONST.ARTICLE_DATA_TITLE_TEXT]}</div>
                        </div>
                      </Link>
                    }
                  </li>
                ))
              )) : <li className='no-article'>该分类下没有文章</li>
            }
          </ul>
        }

        <style jsx>{`
          .article-list {
            position: relative;
            flex: 62;
            ouch-action: none;
            overflow: hidden!important;
            border-right: 1px solid #dcd6ca;
          }

          .list-wrapper {
            position: relative;
            min-height: 100%;
          }

          .no-article {
            width: 100%;
            top: 50%;
            position: absolute;
            color: #B9A691;
            text-align: center;
          }

          .item {
            height: 49px;
            border-bottom: 1px #e4dad1 solid;
            position: relative;
          }

          .item:hover {
            background: #f1ece1;
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
          }

          .on-item {
            background: #f1ece1;
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
          }

          .article-info {
            height: 49px;
            border-bottom: 1px #e4dad1 solid;
            position: relative;
          }

          .article-info .date {
            height: 20px;
            line-height: 20px;
            padding-left: 20px;
            padding-top: 4px;
            color: #b9a691;
            font-size: 12px;
          }

          .article-info .title {
            line-height: 20px;
            height: 20px;
            padding-left: 20px;
            overflow: hidden;
            cursor: default;
            font-size: 14px;
            color: #635753;
            word-break: break-all;
            word-wrap: break-word;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          `}</style>
      </div>
    );
  }
}

export default ArticleList;
