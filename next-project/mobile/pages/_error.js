import React from 'react'
import { withRouter } from 'next/router'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  onGoBackIndexClickHandle = () => {
    this.props.router.replace('/');
  };

  render() {
    return (
      <div className="container">
        <h1>Error</h1>

        <style jsx>{`

        `}</style>
      </div>
    )
  }
}

export default withRouter(Error)
