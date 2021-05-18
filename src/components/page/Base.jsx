const React = require('react');
class Base extends React.Component {
  render(){
    return (
      <div className={this.props.name}>
        基础语法
      </div>
    )
  }
  componentDidMount(){
    import('root/base/async.js')
      .then(module => {
        console.dir(module)
      })
  }
} 
Base.defaultProps = {
  name: 'base'
}

export default Base
