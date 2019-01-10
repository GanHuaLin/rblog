import React, { Component } from 'react';
import BScroll from "better-scroll";
import DynamicUnderline from "./DynamicUnderline";

class AboutContent extends Component {
  constructor(props) {
    super(props);

    this.scroll = null;
    this.scrollWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollWrapperRef.current, {
      bindToWrapper: true,
      click: true,
    });
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  render() {
    return (
      <div className="container" ref={this.scrollWrapperRef}>
        <div className="content">
          <p>大家好，我叫 rbackrock 网名也取过回滚滚</p><br/>
          <p>喜欢计算机，愿望之一是可以撸代码撸到老</p><br/>
          <p>有人说，优秀的程序员，同时也是一名优秀的作家。希望以这亲手打造的博客为契机，开始记录技术和生活的点滴</p><br/>
          <p>如果你喜欢本博客，欢迎使用和 Fork 项目，源代码<a className='link' href="https://github.com/rbackrock/rblog">点这里</a></p><br/>
          <p>电邮：cokekokotea#gmail.com</p><br/>
          <p>感谢你的访问<DynamicUnderline /></p><br/>
          <p style={{ textAlign: 'center', color: 'rgb(222, 216, 197)', fontSize: '3.9vw' }}>博客样式完全参照与锤子便签</p>
        </div>

        <style jsx>{`
          .container {
            height: 94vh;
            background-color: #fffcf6;
            padding: 0 6vw;
            font-size: 4.3vw;
            line-height: 4vh;
            overflow: hidden;
            word-break: break-word!important;
            font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;

            .content {
              padding: 3vh 0;
            }

            .content .link {
              color: #b4a08e;
              text-decoration: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default AboutContent;
