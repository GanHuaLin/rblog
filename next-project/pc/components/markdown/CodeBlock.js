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
        <div className='wrapper'>
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
              border: 'none',
              boxShadow: '0 3px 8px rgba(69,18,10,.4)',
            }}
            codeTagProps={{
              style: {
                display: 'inline-block',
                padding: '0 1.6em 0 0',
              }
            }}
          >{this.props.value}
          </SyntaxHighlighter>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            position: relative;
            align-items:center;
          }

          .wrapper {
            display: flex;
            width: 100%;
            position: relative;
            align-items: center;
            border-radius: 0.5em;
            box-shadow: 0 0 2px rgba(126,50,0,.1) inset, 0 1px 4px rgba(58,15,0,.2);
          }
        `}</style>
      </div>
    );
  }
}

export default CodeBlock;
