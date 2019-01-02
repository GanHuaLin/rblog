import Category from '../components/Category';
import ArticleList from '../components/ArticleList';
import Article from '../components/Article';

export default (props) => (
  <div className='note-wrapper'>
    <div className="note-left">
      <Category
        categoryList={props.categoryList}
        pathParams={props.pathParams}
      />
      <ArticleList
        articleList={props.articleList}
        pathParams={props.pathParams}
      />
    </div>
    <div className="node-right">
      <Article
        article={props.article}
        pathParams={props.pathParams}
      />
    </div>

    <style>{`
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
        flex: 65;
        width: 65vw;
        height: 100%;
        background: url(/static/img/note_icon.png) no-repeat center center;
      }
    `}</style>
  </div>
);
