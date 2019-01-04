export default () => (
  <div className='wrapper'>
    <span className='text'>Loading...</span>

    <style jsx>{`
      .wrapper {
        position: absolute;
        display: table;
        height: 100%;
        z-index: 999;
        width: 100%;
      }

      .text {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        font-size: 36px;
        color: #635753;

        animation: blink 1.3s infinite;
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
  </div>
);
