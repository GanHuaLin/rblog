import React, { Component } from 'react';

class Heading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <h1>{this.props.value}</h1>
    );
  }
}

export default Heading;
