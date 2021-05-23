const React = require('react')
const {Switch, Route} = require('react-router-dom')
const PropTypes = require('prop-types')
const NavBar = require('root/src/components/nav-bar.common.jsx')
const Base = require('./Base.common.jsx');
const Algorithms = require('./Algorithms.common.jsx');
const Mianshi = require('./Mianshi.common.jsx');
const Regexp  = require('./Regexp.common.jsx');
const BugRecord  = require('../bug-record.common.jsx');

class Content extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //subjects: []
    }
  }
  render() {
    return (
      <div>
        <h1 className="header">JavaScript Palyground.</h1>
        <div className="main-content">
          <NavBar {...this.props}  />
          <div className="content">
            <Switch>
              <Route path="/algorithms">
                <Algorithms />
              </Route>
              <Route path="/mianshi">
                <Mianshi />
              </Route>
              <Route path='/base'>
                <Base />
              </Route>
              <Route path='/regexp'>
                <Regexp />
              </Route>
              <Route path='/bug-record'>
                <BugRecord />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
  //componentDidMount(){
    //api.get('/api/subjects')
      //.then(res => {
        //this.setState({
          //subjects: res.data
        //})
      //})
      //.catch(e => console.log(e))
  //}
}
//Content.contextTypes = {
  //router: PropTypes.object.isRequired
//}
Content.propTypes = {
  items: PropTypes.array.isRequired
}
Content.defaultProps = {
  items: []
}

module.exports = Content
