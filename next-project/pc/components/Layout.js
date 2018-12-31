export default (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        width: 100%;
        height: 100%;
      }
    `}</style>

  </div>
);
