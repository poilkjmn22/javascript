import React from "react";
import PropTypes from "prop-types";
import NavListItem from "./NavListItem.jsx";
import DialogAddNavItem from "./dialog-add-nav-item.jsx";
import "./index.css";
import request from "@/request";
import store from "@/store.js";
import { fetchNavList } from "@/reducer";

class NavList extends React.Component {
  constructor(props) {
    super(props);
    this.addNavItem = this.addNavItem.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleConfirmAddNavItem = this.handleConfirmAddNavItem.bind(this);
    this.state = {
      visibleDialogAddNavItem: false,
    };
  }
  render() {
    return (
      <div className="nav-list-wrapper">
        <button className="button button--success" onClick={this.addNavItem}>
          新增菜单
        </button>
        <div className="nav-list">
          {this.props.navList.map((item) => {
            return <NavListItem item={item} key={item.title} />;
          })}
        </div>

        <DialogAddNavItem
          visible={this.state.visibleDialogAddNavItem}
          handleCloseDialog={this.handleCloseDialog}
          handleConfirmAddNavItem={this.handleConfirmAddNavItem}
        />
      </div>
    );
  }
  addNavItem() {
    this.setState({
      visibleDialogAddNavItem: true,
    });
  }
  async handleConfirmAddNavItem(navItem) {
    const res = await request.post(
      "nav-list/add",
          { ...navItem }
    );
    store.dispatch(fetchNavList);
    this.handleCloseDialog();
  }
  handleCloseDialog() {
    this.setState({
      visibleDialogAddNavItem: false,
    });
  }
}

NavList.defaultProps = {
  navList: [],
};

NavList.propTypes = {
  navList: PropTypes.array.isRequired,
};
export default NavList;
