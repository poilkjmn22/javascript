const React = require('react');
class Algorithms extends React.Component{
  render(){
    return (
      <div className={this.props.name}>
        算法问题
      </div>
    )
  }
  componentDidMount(){
    import('root/base/generator.js')
      .then((module) => {
        console.dir(module)
      })
  }
}
Algorithms.defaultProps = {
  name: 'algorithms'
}

export default Algorithms

