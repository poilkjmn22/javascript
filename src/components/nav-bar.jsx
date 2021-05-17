const React = require('react')
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class NavBar extends React.Component{
  render(){
    return (
      <div className="navbar navbar-default">
        <ul className="nav nav-pills navbar-nav ">
          {this.props.items.map((item,idx) => {
            return (
              <li key={idx} className="">
                <Link to={`/${item.name}`}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
NavBar.defaultProps = {
  items: []
}
NavBar.propTypes = {
  items: PropTypes.array.isRequired
}
export default NavBar
