const React = require('react');
const Mianshi = (props) => {
  return (
    <div className={props.name}>
      面试难题
    </div>
  )
} 
Mianshi.defaultProps = {
  name: 'mianshi'
}

export default Mianshi

