import React, { Component } from 'react';
import { withRouter } from 'next/router'
import HeaderLayout from './HeaderLayout';

class AboutHeader extends Component {
  constructor(props) {
    super(props);
  }

  btnBackHandle = () => {
    this.props.router.back();
  };

  render() {
    return (
      <HeaderLayout>
        <div className="container">
          <div className="left">
            <div onClick={this.btnBackHandle} className="btn"><span className="text">返回</span></div>
          </div>
          <div className="center">
            <div className="title">关于</div>
          </div>
          <div className="right"></div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            height: 100%;
            box-sizing: border-box;
            color: #fff;

            .left, .center, .right {
              height: 100%;
              line-height: 6vh;
              text-align: center;
            }

            .left {
              flex: 1;
            }

            .center {
              flex: 6;
              text-align: center;

              .title {
                font-size: 4vw;
                font-weight: 600;
              }
            }

            .right {
              flex: 1;
            }
          }
        `}</style>
      </HeaderLayout>
    );
  }
}

export default withRouter(AboutHeader);
