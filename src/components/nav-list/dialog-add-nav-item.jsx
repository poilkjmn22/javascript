import React from "react";
import PropTypes from "prop-types";
class DialogAddNavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      name: "",
    };
    this.handleChangeInputTitle = this.handleChangeInputTitle.bind(this);
    this.handleChangeInputName = this.handleChangeInputName.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  render() {
    if (!this.props.visible) {
      return "";
    }
    return (
      <div className="dialog">
        <div className="form">
          <div className="form-item">
            <label className="label">名称</label>
            <input
              className="input-base"
              type="text"
              value={this.state.title}
              onChange={this.handleChangeInputTitle}
            />
          </div>
          <div className="form-item">
            <label className="label">路由</label>
            <input
              className="input-base"
              type="text"
              value={this.state.name}
              onChange={this.handleChangeInputName}
            />
          </div>
          <div className="form-item">
            <input
              className="button"
              type="button"
              value="确认"
              onClick={this.handleConfirm}
            />
            <input
              className="button"
              type="button"
              value="取消"
              onClick={this.props.handleCloseDialog}
            />
          </div>
        </div>
      </div>
    );
  }
  handleChangeInputTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  handleChangeInputName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleConfirm() {
    this.props.handleConfirmAddNavItem({ ...this.state });
    this.setState({
    name: '',
    title: '',
    })
  }
}

DialogAddNavItem.defaultProps = {
  navList: [],
};

DialogAddNavItem.propTypes = {
  visible: PropTypes.bool.isRequired,
};
export default DialogAddNavItem;
