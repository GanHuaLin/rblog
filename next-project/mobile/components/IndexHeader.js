import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionCreator from '../common/store/actionCreator';
import HeaderLayout from './HeaderLayout';
import { GoTriangleDown } from "react-icons/go";
import { FaCaretUp, FaCheck } from "react-icons/fa";
import BScroll from "better-scroll";

class IndexHeader extends Component {
  constructor(props) {
    super(props);

    this.categoryListRef = React.createRef();
    this.maskRef = React.createRef();

    this.scrollContainerRef = React.createRef();
    this.scroll = null;
  }

  static async getInitialProps() {
    return {  };
  }

  componentDidMount() {
    this.props.actions.fetchCategoryList();

    this.scroll = new BScroll(this.scrollContainerRef.current, {
      bindToWrapper: true,
      click: true
    });

    this.props.actions.fetchArticleList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.showCategory !== this.props.showCategory) {
      this.isShowCategoryListStyle();
    }
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  isShowCategoryListHandle = (evt) => {
    this.props.actions.showCategoryList(!this.props.showCategory);
  };

  maskHandle = () => {
    this.props.actions.showCategoryList(false);
  };

  chooseCategoryHandle = (evt, category) => {
    evt.stopPropagation();
    this.props.actions.changeCategory(category);
    this.props.actions.showCategoryList(false);
  };

  /**
   * 显示分类列表事件
   * 说明：显示分类列表除了显示 .category-list 以外，还要注意展示 .mask 蒙层，蒙层为了遮住可视区域，蒙层有点击事件，点击以后，隐藏分类列表，要做这几件事
   * 1. 显示分类列表
   * 2. 显示蒙层
   * 3. 分类列表显示以后，进行透明度变化
   *
   * 延迟执行是因为立马设置 display 样式和透明度似乎不会发起动画效果
   *
   */
  isShowCategoryListStyle() {
    const isShowCategory = this.props.showCategory;
    this.maskRef.current.style.display = isShowCategory ? 'block' : 'none';
    if (isShowCategory) {
      this.categoryListRef.current.style.display = 'block';
      this.scroll.refresh();
      window.setTimeout(() => {
        this.categoryListRef.current.style.opacity = '1';
      }, 333);
    } else {
      this.categoryListRef.current.style.opacity = '0';
      window.setTimeout(() => {
        this.categoryListRef.current.style.display = 'none';
        this.scroll.refresh();
      }, 333);
    }
  }

  render() {
    return (
      <HeaderLayout>
        <div className="container">
          <div className="title" onClick={this.isShowCategoryListHandle}>
            <h1 className='text'>{this.props.currentCategory.category_name}<GoTriangleDown color='#413833' size='0.6em' style={{ verticalAlign: 'middle', marginLeft: '2vw' }} /></h1>
          </div>
          <div className="category-list" ref={this.categoryListRef} >
            <div className="list-container">
              <div className='triangle-up'><FaCaretUp color='#f8f8f8' size='1.6em' /></div>
              <div className="scroll-container" ref={this.scrollContainerRef}>
                <ul>
                  {
                    this.props.categoryList.map((category, index) => {
                      // 如果是当前分类，那么显示小钩
                      let isChoose = false;
                      // if ((category.category_id === 'all') && (this.props.currentCategory.category_id === 'all')) {
                      //   isChoose = true;
                      // }

                      if (category.category_id === this.props.currentCategory.category_id) {
                        isChoose = true;
                      }

                      return <li onClick={(evt) => this.chooseCategoryHandle(evt, category)} key={index} className="item"><div className="content"><div className="left"><div className="name">{category.category_name}</div><div className="num">{category.category_num}</div></div><div className="right"><FaCheck color="#5083ff" style={{ visibility: isChoose ? 'visible' : 'hidden', verticalAlign: 'middle' }} /></div></div></li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div onClick={this.maskHandle} className="mask" ref={this.maskRef}></div>
        </div>

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

            .title {
              width: 30%;
              height: 100%;
              margin: 0 auto;

              .text {
                height: 6vh;
                line-height: 6vh;
                font-size: 3.9vw;
                font-weight: 600;
                text-align: center;
                color: #fff;
              }
            }

            .category-list {
              display: none;
              position: absolute;
              top: 5.4vh;
              left: 0;
              right: 0;
              width: 80%;
              margin: auto;
              border-radius: 1vw;
              box-shadow: rgba(58, 15, 0, 0.2) 0px 1px 4px;
              background-color: #f8f8f8;
              z-index: 20;
              opacity: 0;
              transition: opacity .2s ease-out;

              .list-container {
                position: relative;
                padding-top: 1vh;

                .triangle-up {
                  position: absolute;
                  top: -2vh;
                  width: 100%;
                  text-align: center;
                  z-index: 20;
                }

                .scroll-container {
                  max-height: 33vh;
                  overflow: hidden;

                  ul li {
                    box-sizing: border-box;
                    border-bottom: 1px solid transparent;
                    border-image: svg(1px-border param(--color #e6e6e6)) 2 2 stretch;
                  }

                  ul li:last-child {
                    border-bottom: 0;
                  }

                  .item {
                    display: flex;
                    height: 6vh;
                    padding: 0 4vw;
                    color: #585858;

                    .content {
                      margin: auto;
                      width: 100%;
                    }

                    .left, .right {
                      display: inline-block;
                    }

                    .left {
                      width: 95%;

                      .name, .num {
                        display: inline-block;
                      }

                      .name {
                        max-width: 75%;
                        padding-right: 3vw;
                        width-weight: 500;
                      }

                      .num {
                        font-size: 2.6vw;
                        color: #8c8c8c;
                      }
                    }

                    .right {
                      width: 5%;
                    }
                  }
                }
              }
            }

            .mask {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 10;
            }
          }
        `}</style>
      </HeaderLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.getIn(['categoryList']).toJS(),
    currentCategory: state.getIn(['currentCategory']).toJS(),
    showCategory: state.getIn(['showCategory']),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexHeader);
