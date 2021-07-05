export default class NotecateLoader{
  constructor(){}
  static load(notecate){
    switch(notecate){
      case '算法':
        import('@/algorithms/sort/benchmark.js')
          .then((module) => {
          })
          .catch(console.error)
        import('@/algorithms/exhaustive-search/dfs/examples.js')
          .then((module) => {
          })
          .catch(console.error)
        break;
      default:
        break;
    }
  }
}
