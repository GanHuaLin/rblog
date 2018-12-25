export default (props) => (
  <div>
    <ul>
      {
        props.categoryList.map(item => (<li>{item.name}</li>))
      }
    </ul>

    <style jsx>{`
      div {
        flex: 15;
      }
    `}</style>
  </div>
);
