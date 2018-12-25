export default (props) => (
  <div>
    {props.children}

    <style jsx>{`
      div {
        display: flex;
        height: 95%;
      }
    `}</style>
  </div>
);
