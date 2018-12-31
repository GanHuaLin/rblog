import Link from 'next/link';
import React from 'react';
import * as COMMON_CONST from '../common/const';
import {url} from '../helper';

export default (props) => (
  <div>
    <ul>
      {
        props.articleList && (props.articleList.length > 0) ? (
          props.articleList.map((article, index) => (
            <li key={index}>
              {
                <Link as={`${url.makeBlogDataUrlPath({categoryId: props.pathParams[COMMON_CONST.URL_PATH_CATEGORY_TEXT], articleId: article[COMMON_CONST.ARTICLE_DATA_ID_TEXT]})}`} href={'/'}><a>{article.title}</a></Link>
              }
            </li>
          ))
        ): null
      }
    </ul>

    <style jsx>{`
      div {
        flex: 24;
      }
    `}</style>
  </div>
);
