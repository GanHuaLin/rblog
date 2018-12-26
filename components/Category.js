export default (props) => (
  <div>
    <ul>
      {
        props.categoryList.map((item, index) => (<li key={index}>{item.name}</li>))
      }
    </ul>

    <style jsx>{`
      div {
        flex: 15;
      }
    `}</style>
  </div>
);
