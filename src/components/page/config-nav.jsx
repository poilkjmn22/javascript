import React from 'react';
import Table from '../table.jsx';
import api from 'root/src/api.js';
import {last as _last} from 'lodash-es';
class ConfigNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tableData: []
    }
    this.saveCallbackSuccess = this.saveCallbackSuccess.bind(this)
    this.deleteCallback = this.deleteCallback.bind(this)
  }
  render(){
    return (
      <div className={this.props.name}>
        <Table data={this.state.tableData} saveCallbackSuccess={this.saveCallbackSuccess} deleteCallback={this.deleteCallback} />
      </div>
    )
  }
  componentDidMount(){
    this.apiGetSubjects()
  }
  apiGetSubjects(){
    api('get', 'subjects', null, (data) => {
      this.setState({
        tableData: data
      })
    })
  }
  saveCallbackSuccess(){
    this.apiGetSubjects()
    this.props.refreshNavItemsCallback()
  }
  deleteCallback(){
    api('post', 'nav-items/delete', {navItem: _last(this.state.tableData)}, (data) => {
      this.apiGetSubjects()
      this.props.refreshNavItemsCallback()
    })
  }
} 
ConfigNav.defaultProps = {
  name: 'config-nav'
}

export default ConfigNav
