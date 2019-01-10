import React, { Component } from 'react';
import Link from 'next/link';
import BScroll from 'better-scroll'
import moment from 'moment';
import Loading from './Loading';

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

    this.showArticleListStyle();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.articleList && this.props.articleList) {
      if (prevProps.articleList.length !== this.props.articleList.length) {
        this.scroll.refresh();
      }
    }

    this.showArticleListStyle();
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  showArticleListStyle() {
    const articleListDOMArray = this.scrollContainerRef.current.querySelectorAll('.article-item');
    let count = 1;
    articleListDOMArray.forEach(articleDOM => {
      window.setTimeout(() => {
        articleDOM.style.opacity = 1;
      }, count * 100);
      count++;
    });
  }

  render() {
    let containerStyle = {};
    if (this.props.articleList && this.props.articleList.length === 0) {
      containerStyle.background = 'url(/static/img/note_icon.png) no-repeat center center';
      containerStyle.backgroundSize = '50% auto';
    }

    return (
      <div className='container' ref={this.scrollContainerRef} style={containerStyle}>
        {
          !this.props.articleList ? <Loading /> : null
        }
        <ul>
          {
            this.props.articleList && this.props.articleList.map((article, index) => {
              return (
                <Link key={index} as={`/category/${this.props.currentCategoryId}/p/${article.id}`} href={'/'} >
                  <li className='article-item'>
                    <div className="wrapper">
                      <div className="item">
                        <div className='part-left'></div>
                          <div className='part-right'>
                            <div className="date">{moment(article.date).format('YYYY年MM月DD日')}</div>
                            <div className="title">{article['title']}</div>
                          </div>
                        </div>
                    </div>
                  </li>
                </Link>
              );
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
            position: relative;
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
              opacity: 0;
              transition: opacity .2s ease-out;

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

export default ArticleList;
