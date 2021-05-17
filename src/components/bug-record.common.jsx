const React = require('react')
const ReactDOM = require('react-dom')
const fn = ReactDOM.findDOMNode;
const axios = require('axios');
const BugRecordCardList = require('./bug-record-card-list.jsx');
class BugRecord extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      bugRecordList: []
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render(){
    return (
      <div>
        <form className={`form-${this.props.name}`} action="/api/bug-record" method="post" ref="formBugRecord" onSubmit={this.handleSubmit}>
          <textarea rows="10" cols="50" onChange={this.handleChangeText} name="text" value={this.state.text}>
          </textarea>
          <br />
          <input type="submit" value="提交"/>
        </form>
        <BugRecordCardList items={this.state.bugRecordList} />
      </div>
    )
  }
  handleChangeText(event){
    this.setState({
      text: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault()
    //fn(this.refs.formBugRecord).submit()
    axios.post('/api/bug-record', {
      text: this.state.text
    })
      .then(res => {
        if(res.data.code === 0){
          this.getApiBugRecordList()
        }else{
          window.alert('获取bug-record-list数据失败！')
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

module.exports = BugRecord
