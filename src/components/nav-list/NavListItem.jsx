import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import request from "@/request";
import store from "@/store";
import { fetchNavList } from "@/reducer";

class NavListItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNavItem = this.deleteNavItem.bind(this);
  }
  render() {
    return (
      <div
        className={["nav-list-item", "test-clas"]}
        onClick={this.deleteNavItem}
      >
        {this.props.item.title}
      </div>
    );
  }
  async deleteNavItem() {
    // const res = await request.post('nav-items/delete', {navItem: this.props.item})
    store.dispatch(fetchNavList);
  }
}

NavListItem.defaultProps = {
  navList: [],
};

NavListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default NavListItem;
