import React from "react";
import PropTypes from "prop-types";
import NavListItem from "./NavListItem.jsx";
import DialogAddNavItem from "./dialog-add-nav-item.jsx";
import req from "@/req";
import store from "@/store.js";

class NavList extends React.Component {
  constructor(props) {
    super(props);
    this.addNavItem = this.addNavItem.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleConfirmAddNavItem = this.handleConfirmAddNavItem.bind(this);
    this.state = {
      visibleDialogAddNavItem: false,
      parent: null,
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
            return (
              <NavListItem
                item={item}
                key={item.id}
                addNavItem={this.addNavItem}
              />
            );
          })}
        </div>

        <DialogAddNavItem
          visible={this.state.visibleDialogAddNavItem}
          parent={this.state.parent}
          handleCloseDialog={this.handleCloseDialog}
          handleConfirmAddNavItem={this.handleConfirmAddNavItem}
        />
      </div>
    );
  }
  addNavItem(parent) {
    this.setState(
      {
          visibleDialogAddNavItem: true,
          parent,
        }


    );
  }
  async handleConfirmAddNavItem(navItem) {
    await req.post("nav-list/add", { ...navItem });
    store.dispatch('navList');
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
