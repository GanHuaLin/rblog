export default (props) => (
  <div>
    <ul>
      {
        props.articleList.map((item, index) => (<li key={index}>{item.title}</li>))
      }
    </ul>

    <style jsx>{`
      div {
        flex: 24;
      }
    `}</style>
  </div>
);
