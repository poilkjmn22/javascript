import React from 'react'
import ReactDOM from 'react-dom'
const fn = ReactDOM.findDOMNode;
import axios from 'axios'
import BugRecordCardList from './bug-record-card-list.jsx'
import Validator from './validator.jsx'

class BugRecord extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      bugRecordList: [],

      errorMsgText: '',
      isEditing: false,
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddBugRecord = this.handleAddBugRecord.bind(this)
  }
  render(){
    return (
      <div>
        <form style={{display: this.state.isEditing ? 'block' : 'none'}} className={`form-${this.props.name}`} action="/api/bug-record" method="post" ref="formBugRecord" onSubmit={this.handleSubmit}>
          <textarea rows="10" cols="50" onChange={this.handleChangeText} name="text" value={this.state.text}>
          </textarea>
          <br />
          <Validator errorMsg={this.state.errorMsgText} />
          <input className="button-base button-primary" type="submit" value="提交"/>
        </form>
        <button onClick={this.handleAddBugRecord} style={{fontSize: '20px'}} className="button-base button-primary">{this.state.isEditing ? '-' : '+'}</button>
        <BugRecordCardList handleDelete={this.handleDelete} items={this.state.bugRecordList} />
      </div>
    )
  }
  handleDelete(event){
    axios.post('/api/bug-record/delete', {
      bugRecord: event.target.dataset.bugRecord
    })
      .then(res => {
        if(res.data.code === 0){
          this.getApiBugRecordList()
        }else{
          console.error(res.data.msg)
        }
      })
      .catch(console.error)
  }
  handleChangeText(event){
    this.setState({
      text: event.target.value
    }, this.validateText)
  }
  handleAddBugRecord(){
    this.setState({
      isEditing: !this.state.isEditing
    })
  }
  validateText(){
    if(!this.state.text){
      this.setState({
        errorMsgText: '文本内容不可为空！'
      })
    }else{
      this.setState({
        errorMsgText: ''
      })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    //fn(this.refs.formBugRecord).submit()
    this.validateText()
    setTimeout(() => {
      if(!this.state.errorMsgText){
        axios.post('/api/bug-record', {
          text: this.state.text
        })
          .then(res => {
              if(res.data.code === 0){
                this.getApiBugRecordList()
                //
                this.setState({
                  text: '',
                  isEditing: false
                })
              }else{
                window.alert('获取bug-record-list数据失败！')
              }
          })
          .catch(console.error)
      }
    })
  }
  getApiBugRecordList(){
    axios.get('/api/bug-record-list')
      .then(res => {
        this.setState({
          bugRecordList: res.data
        })
      })
  }
  componentDidMount(){
    this.getApiBugRecordList()
  }
}

BugRecord.defaultProps = {
  name: 'bug-record'
}

export default BugRecord
