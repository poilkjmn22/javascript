const React = require('react')
const {Switch, Route} = require('react-router-dom')
const PropTypes = require('prop-types')
import NavBar from 'root/src/components/nav-bar.jsx'
import Base from './Base.jsx';
import Algorithms from './Algorithms.jsx';
import Mianshi from './Mianshi.jsx';
import Regexp from './Regexp.jsx';
import BugRecord from '../bug-record.jsx';

import * as api from 'axios';

class Content extends React.Component {
  constructor(props){
    super(props)
    this.state = {
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
              <Route path='/bug-record'>
                <BugRecord />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){
  }
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
export default Content
