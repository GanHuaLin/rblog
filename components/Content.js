export default (props) => (
  <div>
    {props.articleContent && props.articleContent.content}

    <style jsx>{`
      div {
        flex: 61;
      }
    `}</style>
  </div>
);
