const React = require('react')

const Tag = (props) => {
  return (
    <span data-notecate={props.name} onClick={props.handleClick} className={`tag tag-${props.name}`}>
      {props.title}
    </span>
  )
}
module.exports = Tag
