import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles/prism';
import BScroll from "better-scroll";

class CodeBlock extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.scroll = null;
  }

  componentDidMount() {
    this.scroll = new BScroll(this.wrapperRef.current.querySelector('.syntax-high-lighter-container'), {
      scrollY: false,
      scrollX: true,
      mouseWheel: true,
      scrollbar: {
        fade: false,
        interactive: true
      },
      bounce: false,
      bindToWrapper: true,
      stopPropagation: true
    });

    const rowHeight = 50;
    const containerHeight = this.wrapperRef.current.offsetHeight;
    const containerRowCount = window.Math.ceil(containerHeight / rowHeight);
    this.wrapperRef.current.style.height = window.Math.floor(containerRowCount * rowHeight) + 'px';
  }

  render() {
    return (
      <div className='container' ref={this.wrapperRef}>
        <SyntaxHighlighter
          className='syntax-high-lighter-container'
          wrapLines={true}
          language={this.props.language}
          style={dark}
          customStyle={{
            margin: '0',
            overflow: 'hidden',
            position: 'relative',
            flex: 1,
          }}
          codeTagProps={{
            style: {
              display: 'inline-block',
              padding: '0 1.6em 0 0',
            }
          }}
        >{this.props.value}
        </SyntaxHighlighter>

        <style jsx>{`
          .container {
            display: flex;
            position: relative;
            align-items:center;
          }
        `}</style>
      </div>
    );
  }
}

export default CodeBlock;
