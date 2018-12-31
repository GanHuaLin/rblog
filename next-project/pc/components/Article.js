import * as COMMON_CONST from '../common/const';
import ReactMarkdown from 'react-markdown';

export default (props) => (
  <div>
    {
      props.article ? (
          <ReactMarkdown source={props.article[COMMON_CONST.ARTICLE_DATA_CONTENT_TEXT]} />
      ) : null
    }
    <style jsx>{`
      div {
        flex: 61;
      }
    `}</style>
  </div>
);
