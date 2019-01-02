import Header from './Header';

export default (props) => (
  <div className='wrapper'>
    <Header />
    {props.children}
    <style jsx>{`
      .wrapper {
        width: 100%;
        height: 100%;
        // min-height: 700px;
        min-width: 1280px;
        overflow: hidden;
      }
    `}</style>
  </div>
);
