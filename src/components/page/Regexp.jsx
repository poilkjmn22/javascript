const React = require("react");
const Regexp = (props) => {
  return <div className={props.name}>正则表达式</div>;
};
Regexp.defaultProps = {
  name: "regexp",
};

export default Regexp;
