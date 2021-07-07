const React = require('react')
const {Switch, Route} = require('react-router-dom')
const PropTypes = require('prop-types')
import NavBar from 'root/src/components/nav-bar.jsx'
import ConfigNotecate from './config-notecate.jsx';
import ConfigNav from './config-nav.jsx';
import RecordDetail from './record-detail.jsx';
import BugRecord from '../bug-record.jsx';
import Mianshi from '../mianshi.jsx';

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
              <Route path='/mianshi'>
                <Mianshi />
              </Route>
              <Route path='/config-notecate'>
                <ConfigNotecate />
              </Route>
              <Route path='/config-nav'>
                <ConfigNav refreshNavItemsCallback={this.props.refreshNavItemsCallback} />
              </Route>
              <Route path='/record/detail'>
                <RecordDetail />
              </Route>
              <Route path='/'>
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
