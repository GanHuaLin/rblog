import Link from 'next/link';
import * as COMMON_CONST from '../common/const';
import {url} from '../helper';

export default (props) => (
  <div>
    <ul>
      {
        props['categoryList'] && (props['categoryList'].length > 0) ? (props['categoryList'].map((category, index) => (
          <li key={index}>
            <Link as={category.id === COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME ?
              `${url.makeBlogDataUrlPath({categoryId: COMMON_CONST.URL_PATH_ALL_CATEGORY_NAME})}`
              :
              `${url.makeBlogDataUrlPath({categoryId: category.id})}`} href={'/'}><a>{category.name}</a></Link>
          </li>
        ))) : null
      }
    </ul>
    <style jsx>{`
      div {
        flex: 15;
        touch-action: none;
        overflow: hidden!important;
      }
    `}</style>
  </div>
);
