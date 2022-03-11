/*
 * @Author: fangqi
 * @Date: 2022-03-05 08:56:57
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-05 08:56:57
 * @Description:
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
const React = require('react');
import './dialog-notecate.css';
import axios from 'axios';

class DialogNotecate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleType: '',
      addNotecateTitle: '',
      updateNotecate: '',
    };
    this.handleClickAddNotecate = this.handleClickAddNotecate.bind(this);
    this.handleChangeAddNotecate = this.handleChangeAddNotecate.bind(this);
    this.handleKeyupAddNotecate = this.handleKeyupAddNotecate.bind(this);
    this.handleDeleteNotecate = this.handleDeleteNotecate.bind(this);
    this.handleClickUpdateNotecate = this.handleClickUpdateNotecate.bind(this);
    this.handleChangeUpdateNotecate =
      this.handleChangeUpdateNotecate.bind(this);
    this.handleKeyupUpdateNotecate = this.handleKeyupUpdateNotecate.bind(this);

    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    const { notecate, isShow } = this.props;
    return (
      <div className={`dialog-box notecate ${isShow ? '' : 'display-none'}`}>
        <h2 className="dialog-header">
          {notecate.name}{' '}
          <span className="btn-close with-icon" onClick={this.handleClose}>
            <i className="iconfont icon-close"></i>
          </span>
        </h2>
        <div className="dialog-body">
          <div className="handle-type">
            <button
              className="button-base button-primary"
              onClick={this.handleClickAddNotecate}
            >
              新增子分类
            </button>
            <input
              className={this.state.handleType === 'ADD' ? '' : 'display-none'}
              ref="inputNotecate"
              value={this.state.addNotecateTitle}
              onChange={this.handleChangeAddNotecate}
              type="text"
              onKeyUp={this.handleKeyupAddNotecate}
            />
          </div>
          <div className="handle-type">
            <button
              className="button-base button-primary"
              onClick={this.handleClickUpdateNotecate}
            >
              编辑
            </button>
            <input
              className={
                this.state.handleType === 'UPDATE' ? '' : 'display-none'
              }
              ref="updateNotecate"
              value={this.state.updateNotecate}
              onChange={this.handleChangeUpdateNotecate}
              type="text"
              onKeyUp={this.handleKeyupUpdateNotecate}
            />
          </div>
          <div className="handle-type">
            <button
              className="button-base button-delete"
              onClick={this.handleDeleteNotecate}
            >
              删除
            </button>
            <br />
          </div>
        </div>
      </div>
    );
  }
  emitRefreshNotecateList(msg) {
    this.resetFields();
    window.alert(msg);
    this.props.handleCloseDialog();
    this.props.refreshNotecateList();
  }
  resetFields() {
    this.setState({
      addNotecateTitle: '',
      handleType: '',
      updateNotecate: '',
    });
  }
  handleClose() {
    this.resetFields();
    this.props.handleCloseDialog();
  }
  handleClickAddNotecate() {
    this.setState({
      handleType: 'ADD',
    });
  }
  handleChangeAddNotecate(event) {
    this.setState({
      addNotecateTitle: event.target.value,
    });
  }
  async handleKeyupAddNotecate(event) {
    if (event.keyCode === 13) {
      if (!event.target.value) return;
      const { name: parentNotecate } = this.props.notecate;
      const res = await axios
        .post('/api/note-cate/add', {
          name: event.target.value,
          _parent: parentNotecate === 'root' ? '' : parentNotecate,
        })
        .catch(console.error);
      if (res.data.code === 0) {
        this.setState({
          addNotecateTitle: '',
          handleType: '',
        });
        this.emitRefreshNotecateList('新增成功');
      }
    }
  }
  async handleDeleteNotecate() {
    this.setState({
      handleType: 'DELETE',
    });
    const confirm = window.confirm();
    if (confirm) {
      const res = await axios
        .post('api/note-cate/delete', this.props.notecate)
        .catch(console.error);
      if (res.data.code === 0) {
        this.emitRefreshNotecateList('删除成功');
      }
    }
  }
  handleClickUpdateNotecate() {
    this.setState({
      handleType: 'UPDATE',
      updateNotecate: this.props.notecate.name,
    });
  }
  handleChangeUpdateNotecate() {
    this.setState({
      updateNotecate: event.target.value,
    });
  }
  async handleKeyupUpdateNotecate() {
    if (event.keyCode === 13) {
      if (!event.target.value) return;
      const res = await axios
        .post('api/note-cate/update', {
          lastValue: this.props.notecate,
          newValue: {
            name: this.state.updateNotecate,
            _parent: this.props.notecate._parent,
          },
        })
        .catch(console.error);
      if (res.data.code === 0) {
        this.emitRefreshNotecateList('更新成功');
      }
    }
  }
}
export default DialogNotecate;
