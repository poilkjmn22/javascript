import React from "react";
import PropTypes from "prop-types";
import "./nav-list-item.css";
import req from "@/req";
import store from "@/store";

class NavListItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNavItem = this.deleteNavItem.bind(this);
    this.handleAddNavItem = this.handleAddNavItem.bind(this);
  }
  render() {
    const paddingSize = 20;
    function isLeaf(item) {
      return !(item.children && item.children.length > 0);
    }

    function getClassName(item) {
      const className = ["nav-list-item", `level-${item.level}`];
      isLeaf(item) && className.push("is-leaf");
      return className.join(" ");
    }

    function getStyle(item) {
      return {
        paddingLeft: `${item.level * paddingSize}px`,
      };
    }

    const { item } = this.props;
    return (
      <div
        className={getClassName(item)}
        style={getStyle(item)}
        
      >
        <div className="main-info">{this.props.item.title}</div>
        <div className="btn-group">
          <i className="iconfont icon-add"  onClick={this.handleAddNavItem}></i>
          <i className="iconfont icon-edit"></i>
          <i className="iconfont icon-delete" onClick={this.deleteNavItem}></i>
        </div>
        {!isLeaf(item) &&
          item.children.map((c) => {
            return <NavListItem item={c} key={c.id} addNavItem={this.props.addNavItem} />;
          })}
      </div>
    );
  }
  async deleteNavItem() {
     const params = {...this.props.item}
     delete params.level
     await req.post('nav-list/delete', params)
     store.dispatch('navList');
  }
  handleAddNavItem() {
    this.props.addNavItem(this.props.item)
  }
}

NavListItem.defaultProps = {
  item: [],
};

NavListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default NavListItem;
