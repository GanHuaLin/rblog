export default (props) => (
  <div className='container'>
    {props.children}

    <style jsx>{`
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: relative;
    `}</style>
  </div>
);
