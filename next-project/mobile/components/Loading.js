import { Fragment } from 'react';

export default () => (
  <Fragment>
    <div className="loading"><span className="text">Loading...</span></div>

    <style jsx>{`
      .loading {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;

        .text {
          font-size: 8vw;
          animation: blink 1.3s infinite;
        }
      }

      @keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }
      @-webkit-keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }
      @-moz-keyframes blink {
        0% { opacity:1; }
        50% { opacity:0; }
        100% { opacity:1; }
      }
    `}</style>
  </Fragment>
);
