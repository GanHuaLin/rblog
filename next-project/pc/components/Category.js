import React, { Component } from 'react';
import Link from 'next/link';
import BScroll from 'better-scroll'
import * as url from '../util/url';

class Category extends Component {
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

  onCategoryMouseEnterHandle = () => {
    this.toggleScrollBar(true);
  };

  onCategoryMouseLeaveHandle = () => {
    this.toggleScrollBar(false);
  };

  toggleScrollBar(toggle, isTransition=true) {
    this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.opacity = toggle ? 1 : 0;
    if (isTransition) {
      this.scrollContainerRef.current.querySelector('.bscroll-vertical-scrollbar').style.transitionDuration = '500ms';
    }
  }

  isOnCategoryStyleClass = (path, id, index) => {
    if ((path === id) || (!path && (index === 0))) {
      return 'on-item'
    }

    return '';
  };

  render() {
    return (
      <div className='category' ref={this.scrollContainerRef} onMouseEnter={this.onCategoryMouseEnterHandle} onMouseLeave={this.onCategoryMouseLeaveHandle}>
        {
          this.props['categoryList'] && (this.props['categoryList'].length) > 0 ? (
            <ul className='list-wrapper'>
              {
                this.props['categoryList'].map((category, index) => (
                  <li className={`item ${this.isOnCategoryStyleClass(this.props['pathParams'].category, category.category_id, index)}`} key={index}>
                    <Link as={
                      category.category_id === 'all' ?
                        `${url.makeBlogDataUrlPath({categoryId: 'all'})}` :
                        `${url.makeBlogDataUrlPath({categoryId: category.category_id})}`}
                      href={'/'}
                    >
                      <div className='category-info'>
                        <div className="name">{category.category_name}</div>
                        <div className="num">{category.category_num}</div>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
          ) : null
        }

        <style jsx>{`
          .category {
            position: relative;
            flex: 38;
            ouch-action: none;
            overflow: hidden!important;
            border-right: 1px solid #dcd6ca;
          }

          .list-wrapper {
            position: relative;
          }

          .item {
            height: 49px;
            border-bottom: 1px #e4dad1 solid;
            position: relative;
          }

          .item:after {
            content: '';
            display: block;
            width: 0;
            visibility: hidden;
          }

          .item:hover {
            background: #f1ece1;
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
          }

          .on-item {
            background: #f1ece1;
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;
          }

          .category-info {
            margin-left: 15px;
            margin-right: 15px;
            height: 49px;
            line-height: 49px;
            color: #635752;
          }

          .category-info .name {
            display: inline-block;
            position: relative;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            max-width: 80%;
            overflow: hidden;
            vertical-align: top;
            font-size: 14px;
            color: #635753;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: default;
          }

          .category-info .num {
            float: right;
            color: #b8a692;
            min-width: 30px;
            text-align: right;
            opacity: 1;
            transition: all .3s ease;
          }
        `}</style>
      </div>
    );
  }
}

export default Category;
