import React, { Component } from 'react';
import { IoIosExpand } from "react-icons/io";
import Category from '../components/Category';
import ArticleList from '../components/ArticleList';
import Article from '../components/Article';

class NoteContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  onToggleExpandClickHandle = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  render() {
    let leftStyle = {};
    let rightStyle = {};
    if (this.state.expand) {
      leftStyle.visibility = 'hidden';
      rightStyle.transform = 'translate3d(-17.5vw, 0, 0)';
    } else {
      leftStyle.visibility = 'visible';
      rightStyle.transform = 'translate3d(0, 0, 0)';
    }

    return (
      <div className='note-wrapper'>
        <div className="note-left" style={leftStyle}>
          <Category
            categoryList={this.props.categoryList}
            pathParams={this.props.pathParams}
          />
          <ArticleList
            articleList={this.props.articleList}
            pathParams={this.props.pathParams}
          />
        </div>
        <div className="node-right" style={rightStyle}>
          <span className='wrapper-expand' onClick={this.onToggleExpandClickHandle}><IoIosExpand /></span>
          <Article
            article={this.props.article}
            pathParams={this.props.pathParams}
          />
        </div>

        <style jsx>{`
          .note-wrapper {
            display: flex;
            width: 100%;
            height: 95%;
            overflow: hidden;
          }

          .note-left {
            display: flex;
            flex: 35;
            width: 35vw;
            max-width: 745px;
            background: #fbf7ed;
            box-shadow: rgba(0,0,0,.1) 1px 0 3px;
          }

          .node-right {
            position: relative;
            flex: 65;
            width: 65vw;
            height: 100%;
            background: url(/static/img/note_icon.png) no-repeat center center;
            transition: all .3s ease-out;

            .wrapper-expand {
              color: #b4a08e;
              position: absolute;
              top: 8px;
              right: 0px;
              z-index: 10;
              font-size: 1.8em;
            }

            .wrapper-expand:hover {
              color: #645647;
              cursor: pointer;
            }
          }
        `}</style>
      </div>
    );
  };
}

export default NoteContent;
