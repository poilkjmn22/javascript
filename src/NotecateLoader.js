export default class NotecateLoader{
  constructor(){}
  static async load(notecate){
    switch(notecate){
      case '算法':
        // import('@/algorithms/sort/benchmark.js')
        //   .then((module) => {
        //   })
        //   .catch(console.error)
        import('@/algorithms/exhaustive-search/dfs/examples.js')
          .then((module) => {
          })
          .catch(console.error)
        break;
      case 'async':
        // import('@/base/async.js')
        //   .then((module) => {
        //   })
        //   .catch(console.error)
        // import('@/deep/generator.js')
        //   .then((module) => {
        //   })
        //   .catch(console.error)
        import('@/deep/async.js')
          .then((module) => {
          })
          .catch(console.error)
        break;
      case '正则表达式':
        const { camelCase } = await import('@/regexp/word.js')
        console.log(camelCase('  border-bottom-width'))
        console.log(camelCase('border bottom width'))
        console.log(camelCase('border_bottom_width'))
        break;
      default:
        break;
    }
  }
}
