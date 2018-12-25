export default (props) => (
  <div>
    <ul>
      {
        props.articleList.map(item => (<li>{item.title}</li>))
      }
    </ul>

    <style jsx>{`
      div {
        flex: 24;
      }
    `}</style>
  </div>
);
