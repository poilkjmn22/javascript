import React from "react";
class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={this.props.name}>record-detail</div>;
  }
  componentDidMount() {}
}
RecordDetail.defaultProps = {
  name: "record-detail",
};

export default RecordDetail;
