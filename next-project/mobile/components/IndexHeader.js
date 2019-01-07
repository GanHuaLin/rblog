import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionCreator from '../common/store/actionCreator';
import HeaderLayout from './HeaderLayout';
import { GoTriangleDown } from "react-icons/go";
import { FaCaretUp, FaCheck } from "react-icons/fa";

class IndexHeader extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps() {
    return {  };
  }

  componentDidMount() {
    this.props.actions.fetchCategoryList();
  }

  // 显示可选分类列表
  showCategoryListHandle = () => {

  };

  chooseCategoryHandle = (evt, category) => {
    console.log(evt, category)
  };

  render() {
    return (
      <HeaderLayout>
        <div className="container">
          <div className="title">
            <h1 className='text' onClick={this.showCategoryListHandle}>{this.props.currentCategory.category_name}<GoTriangleDown color='#413833' size='0.6em' style={{ verticalAlign: 'middle', marginLeft: '2vw' }} /></h1>
          </div>
          <div className="category-list">
            <ul>
              {
                this.props.categoryList.map((category, index) => {
                  let isChoose = false;
                  if (this.props.currentCategory.category_id !== 'all') {
                    isChoose = true;
                  } else {
                    if (category.category_id === this.props.currentCategory.category_id) {
                      isChoose = true;
                    }
                  }

                  return <li onClick={(evt) => this.chooseCategoryHandle(evt, category)} key={index} className="item"><div className="content"><div className="left"><div className="name">{category.category_name}</div><div className="num">{category.category_num}</div></div><div className="right"><FaCheck color="#5083ff" style={{ visibility: isChoose ? 'visible' : 'hidden', verticalAlign: 'middle' }} /></div></div></li>
                })
              }
            </ul>
          </div>
          <div className='triangle-up'><FaCaretUp color='#f8f8f8' size='1.6em' /></div>
          <div className="mask"></div>
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
              position: absolute;
              top: 5.4vh;
              left: 0;
              right: 0;
              width: 80%;
              overflow: auto;
              margin: auto;
              border-radius: 1vw;
              box-shadow: rgba(58, 15, 0, 0.2) 0px 1px 4px;
              background-color: #f8f8f8;
              z-index: 20;

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

            .triangle-up {
              position: absolute;
              top: 3.4vh;
              width: 100%;
              text-align: center;
              z-index: 20;
            }

            .mask {
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexHeader);
