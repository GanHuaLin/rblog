import React, { Component } from 'react';
import * as COMMON_CONST from '../../common/const';
import ReactMarkdown from 'react-markdown';
import BScroll from "better-scroll";

import CodeBlock from './markdown/CodeBlock';
import LoadingTips from './LoadingTips';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: true
    };

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
    });

    this.toggleScrollBar(false, false);
    if (this.contentRef.current) {
      this.setShowLoadingStatus(false);
      this.setShowArticle(true);
    }

    this.recalculateImageHeight();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.contentRef.current) {
      this.setShowArticle(true);
      this.recalculateImageHeight();
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

  setShowArticle(show) {
    this.contentRef.current.style.opacity = show ? 1 : 0;
  }

  setShowLoadingStatus(show) {
    this.setState({
      showLoading: show
    });
  }

  toggleScrollBar(toggle, isTransition=true) {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
      if (isTransition) {
        this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
      }
    }
  }

  fixImageHeight = (images) => {
    const rowHeight = 50;
    const containerHeight = images.naturalHeight;
    const containerRowCount = window.Math.ceil(containerHeight / rowHeight);

    return window.Math.floor(containerRowCount * rowHeight) + 'px';
  };

  // 重新计算图片的高度
  // TODO - 目前其实也没使用，留着吧，以后如果有需要再修改
  recalculateImageHeight = () => {
    const originImages = this.scrollContainerRef.current.querySelectorAll('img');
    const newImageLoadPromise = [];
    const loadHandle = (evt, resolve, index, newImage) => {
      resolve({
        image: newImage,
        height: this.fixImageHeight(newImage),
        width: newImage.naturalWidth + 'px',
        index
      });
    };

    originImages.forEach((image, index) => {
      newImageLoadPromise.push(new Promise(resolve => {
        let newImage = new window.Image();
        newImage.addEventListener('load', (evt) => loadHandle(evt, resolve, index, newImage));
        newImage.alt = image.alt;
        newImage.title = image.title;
        newImage.src = image.src;
      }));
    });

    Promise.all(newImageLoadPromise).then((imageOffSetHeight) => {
      imageOffSetHeight.forEach(fixImageInfo => {
        fixImageInfo.image.removeEventListener('load', loadHandle);
        originImages[fixImageInfo.index].style.height = '450px'; //fixImageInfo.height;
        originImages[fixImageInfo.index].style.width = 'auto';
        originImages[fixImageInfo.index].style.display = 'block';
        originImages[fixImageInfo.index].style.opacity = '1';
        originImages[fixImageInfo.index].style.margin = '50px auto';
        originImages[fixImageInfo.index].style.border = '0.3em solid #fff';
      });
    }).finally(() => {
      if (this.scroll) {
        this.scroll.refresh();
      }
    });
  };

  render() {
    return (
      <div className='article'>
        {
          this.state.showLoading ? <LoadingTips /> : null
        }

        <div className='wrapper' ref={this.scrollContainerRef} onMouseEnter={this.onArticleMouseEnterHandle} onMouseLeave={this.onArticleMouseLeaveHandle}>
          {
            <div className="container" >
              {
                this.props.article ? (
                  <div className="content" >
                    <div className='md-content' ref={this.contentRef} style={{opacity: 0}}>
                      <h1 style={{ textAlign: 'center' }}>{this.props.article.title}</h1>
                      <ReactMarkdown
                        source={this.props.article[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT]}
                        escapeHtml={true}
                        linkTarget='_blank'
                        renderers={{
                          code: CodeBlock,
                          // heading: Heading,
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
          position: relative;
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
          color: #645647;
          line-height: 50px;
          font-size: 17px;
          background: url(/static/img/note_detail_edge.jpg) repeat-y;
        }

        .md-content {
          white-space: normal;
          word-break: break-all;
          transition: opacity .3s ease-out;
        }

        .md-content:after {
          display: block;
          content: ' ';
          height: 150px;
        }

        /* --- markdown 样式 --- */

        /* h1 ~ h6 */
        .md-content :global(h1) {
          font-size: 27px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h2) {
          font-size: 25px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h3) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h4) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h5) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        .md-content :global(h6) {
          font-size: 23px;
          font-weight: 400;
          color: #645647;
          line-height: 50px;
          margin: 0;
          word-break: break-all;
        }

        /* strong */
        .md-content :global(strong) {
          font-weight: 700;
        }

        /* blockquote */
        .md-content :global(blockquote) {
          font-size: 20px;
          line-height: 50px;
          margin: 0;
          padding-left: 38px;
          position: relative;
          min-height: 50px;
          word-break: break-all;
          color: #b4a08e;
          background-size: 13px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MTE5MThmNC1lYjM0LTRmMTAtOThlMS0wNGU5NTczZTVkOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTk1NTJCQzE4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTk1NTJCQzA4NTRGMTFFNkJCNjdCRTNENzMyQzJFNTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQzMTkyM2NmLTYyZWEtNDAwNS1iNDg2LTdhYjllNDQ0MjM5OSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkzOTdhMDhkLWE2NjUtMTE3OS1hZWYxLWE1MjY4MTQ3ZGEyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOrP8kAAADUSURBVHjaYiwJ02CgJmCiUB4dsLDgMEQYirmA+BwBQ5iBWAyIhYCYA91AXiBWAGI2Il0kAMRyQMwKdyKSpBDUMEYiDQO5ShZXGHGTaBgvNsOQXYjNsF9A/AKLHkaoenTwE6QeZKAgKDDRJD8D8V0g/otFoxCWMP4IxPeA+B8T1EBk8Bcq+ReHd4XQ+H+A+D7IMFgY8qApeA9VhAtwYVH/FzlS0JPOFwIJHa96FiyR8Q+aWJGDADlCGPCpx5ZTlND4ZwkkIWVK8irFhcOogcPBQIAAAwA1ph0Za5PfQwAAAABJRU5ErkJggg==);
          background-repeat: no-repeat;
          background-position: 0 10px;
        }

        .md-content :global(blockquote):after {
          width: 1.5px;
          top: 0;
          bottom: 0;
          left: 25px;
          background-color: transparent;
          border: 1px solid #dfd6c5;
          border-top: 0;
          border-bottom: 0;
          position: absolute;
          content: ' ';
          overflow: hidden;
        }

        /* ul, ol */
        .md-content :global(ul) {
          margin-left: 21px;
          line-height: 50px;
          min-height: 50px;
          text-indent: 18px;
          position: relative;
          list-style: none;
          word-break: break-all;
          font-size: 21px;
        }

        .md-content :global(ol) {
          margin-left: 21px;
          line-height: 50px;
          min-height: 50px;
          text-indent: 18px;
          position: relative;
          list-style: none;
          word-break: break-all;
          font-size: 21px;
        }

        .md-content :global(ol li) {
          position: relative;
        }

        .md-content :global(ul):after {
          content: '.';
          width: 8px;
          position: absolute;
          top: 20px;
          height: 8px;
          background: #dfd6c5;
          overflow: hidden;
          left: 1px;
          border-radius: 4px;
        }

        .md-content :global(ol li):after {
          content: '.';
          width: 8px;
          position: absolute;
          top: 20px;
          height: 8px;
          background: #dfd6c5;
          overflow: hidden;
          left: 1px;
          border-radius: 4px;
        }

        .md-content :global(a) {
          color: #b4a08e;
          text-decoration: none;
        }

        .md-content :global(a):hover {
          color: #645647;
        }

        /* table */
        .md-content :global(table) {
          width: 100%;
          margin: 50px 0;
          border-spacing: 0px;
          box-sizing: border-box;
          border-collapse:collapse;
        }

        .md-content :global(table tr th) {
          border: 1px solid #ece6df;
          border-top: none;
          border-bottom: none;
        }

        .md-content :global(table tr td) {
          border: 1px solid #ece6df;
          border-top: none;
          border-bottom: none;
        }

        .md-content :global(hr) {
          display: none;
        }

        /* image */
        .md-content :global(img) {
          max-width: 100%;
          width: 300px;
          height: 300px;
          opacity: 0;
          vertical-align: top;
          background-color: #fff;
          box-shadow: 0 1px 4px rgba(58,15,0,.2);
          box-sizing: border-box;
          transition: opacity .3s ease-out;
        }
      `}</style>
      </div>
    )
  }
}

export default Article;
