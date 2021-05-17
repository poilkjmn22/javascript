
const React = require('react');
const Base = (props) => {
  return (
    <div className={props.name}>
      基础语法
    </div>
  )
} 
Base.defaultProps = {
  name: 'base'
}

module.exports = Base
