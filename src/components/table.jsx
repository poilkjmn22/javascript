import React from 'react';
import PropTypes from 'prop-types';
import './table.css';
import api from 'root/src/api.js';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingRow: {
        name: '',
        title: '',
      },
      isEditing: false,
    };
    this.handleChangeEditingTd = this.handleChangeEditingTd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickEditing = this.handleClickEditing.bind(this);
  }
  render() {
    const dataRow0 = this.props.data[0];
    if (!dataRow0) {
      return <p>暂无数据</p>;
    }
    const tableProps = Object.keys(dataRow0);
    const editingTds = [];
    for (let k of tableProps) {
      editingTds.push(
        <td key={k}>
          <input
            name={k}
            value={this.state.editingRow[k]}
            onChange={this.handleChangeEditingTd}
          />
        </td>
      );
    }
    return (
      <table className={this.props.name}>
        <thead>
          <tr>
            {tableProps.map((item) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((item) => {
            const tdList = [];
            for (let k in item) {
              tdList.push(<td key={k}>{item[k]}</td>);
            }
            return <tr>{tdList}</tr>;
          })}
          <tr
            className={[
              'editing-row',
              this.state.isEditing ? '' : 'display-none',
            ].join(' ')}
          >
            {editingTds}
          </tr>
        </tbody>
        <tfoot>
          <tr className="opra-row">
            <td colSpan="2">
              <button onClick={this.handleSave} className="button-base">
                OK
              </button>
              <button onClick={this.handleClickEditing} className="button-base">
                +
              </button>
              <button
                className="button-base button-delete"
                onClick={this.handleDelete}
              >
                -
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
  handleChangeEditingTd(event) {
    this.setState({
      editingRow: Object.assign({}, this.state.editingRow, {
        [event.target.name]: event.target.value,
      }),
    });
  }
  handleClickEditing() {
    this.setState({
      isEditing: true,
    });
  }
  handleSave() {
    api(
      'post',
      'nav-items/add',
      Object.assign({}, this.state.editingRow, {
        score: this.props.data.length,
      }),
      (data) => {
        this.props.saveCallbackSuccess();
        this.resetState();
      }
    );
  }
  handleDelete() {
    this.resetState();
    if (this.state.isEditing) {
      return this.setState({
        isEditing: false,
      });
    }
    this.props.deleteCallback();
  }
  resetState() {
    this.setState({
      editingRow: {
        name: '',
        title: '',
      },
      isEditing: false,
    });
  }
}

Table.defaultProps = {
  data: [],
  name: 'table-default',
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Table;
