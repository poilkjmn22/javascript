import React from "react";

class Mianshi extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>面试</div>;
  }
  componentDidMount() {
    import("root/src/mianshi/xiaomi.js").then((module) => {
      const { traverseNode, genParen, genParenNoRepeat } = module;
      let children = traverseNode(document.body);
      console.dir(children);

      console.log(genParen(2));
      console.log(genParenNoRepeat(3));
    });
  }
}

export default Mianshi;
