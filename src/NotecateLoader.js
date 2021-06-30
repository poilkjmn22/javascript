export default class NotecateLoader{
  constructor(){}
  static load(notecate){
    switch(notecate){
      case '算法':
        import('root/algorithms/sort/benchmark.js')
          .then((module) => {
          })
          .catch(console.error)
        import('root/algorithms/exhaustive-search/dfs/examples.js')
          .then((module) => {
          })
          .catch(console.error)
        break;
      default:
        break;
    }
  }
}
