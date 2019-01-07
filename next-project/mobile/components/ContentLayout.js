export default (props) => (
  <div className='container'>
    {props.children}

    <style jsx>{`
      .container {
        width: 100vw;
        height: 94vh;
      }
    `}</style>
  </div>
);
