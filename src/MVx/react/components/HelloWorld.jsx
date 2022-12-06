import React from "react";
export default class HelloWorld extends React.Component {
  render() {
    return <h2 {...this.props}>Hello {this.props.frameworkName} World!!!</h2>;
  }
}
