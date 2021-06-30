const React = require('react');
import Tag from '../tag.jsx';
import axios from 'axios';
import "./config-notecate.css";
import NotecateLoader from 'root/src/NotecateLoader.js'

class ConfigNotecate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notecateList: [],
      addNotecateTitle: '',
      isEditing: false,
    }
    this.handleChangeNotecateTitle = this.handleChangeNotecateTitle.bind(this)
    this.handleKeyupNotecate = this.handleKeyupNotecate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickNotecate = this.handleClickNotecate.bind(this)
  }
  render(){
    const notecateList = this.state.notecateList;
    const tagList = [];
    for(const k in notecateList){
      tagList.push(<Tag handleClick={this.handleClickNotecate} key={k} name={k} title={notecateList[k]}></Tag>);
    }
    return (
      <div className={this.props.name}>
        <div className="notecate-list">
          {tagList}
        </div>
        <div className="opra-area">
          <input className={['input-add-notecate',this.state.isEditing ? '' :  'display-none'].join(' ')} value={this.state.addNotecateTitle} onChange={this.handleChangeNotecateTitle} type="text" onKeyUp={this.handleKeyupNotecate} />
          <button onClick={this.handleClick}  className="button-base">{this.state.isEditing ? '-' : '+'}</button>
        </div>
      </div>
    )
  }
  getApiNotecateList(){
    axios.get('/api/note-cate-map')
      .then(res => {
        this.setState({
          notecateList: res.data
        })
      })
      .catch(console.error)
  }
  handleClick(){
    this.setState({
      isEditing: !this.state.isEditing
    })
  }
  handleClickNotecate(event){
    NotecateLoader.load(event.target.dataset.notecate)
  }
  handleChangeNotecateTitle(event){
    this.setState({
      addNotecateTitle: event.target.value
    })
  }
  handleKeyupNotecate(event){
    if(event.keyCode === 13){
      if(!event.target.value) return
      axios.post('/api/note-cate/add', {
        title: event.target.value
      })
        .then(res => {
          if(res.data.code === 0){
            this.setState({
              addNotecateTitle: '',
              isEditing: false
            })
            this.getApiNotecateList()
          }
        })
        .catch(console.error)
    }
  }
  componentDidMount(){
    this.getApiNotecateList()
  }
} 
ConfigNotecate.defaultProps = {
  name: 'config-notecate'
}

export default ConfigNotecate

