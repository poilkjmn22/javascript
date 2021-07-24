import { CSvg } from '@/utils/svg.js'

export default class NotecateLoader{
  constructor(){}
  static async load(notecate, comp){
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
      case 'd3':
        const { makeSymbols, makeLines, makeCurves, makePie } = await import('@/d3/maker.js')
        const { elModules } = comp.refs
        const svgSymbols = elModules.appendChild(CSvg('svg', {
          class: 'shapes'
        }))
        makeSymbols(svgSymbols)

        const svgLines = elModules.appendChild(CSvg('svg', {
          class: 'lines'
        }))
        makeLines(svgLines)

        const svgCurves = elModules.appendChild(CSvg('svg', {
          width: 700,
          height: 670,
        }))
        makeCurves(svgCurves)

        const svgPie = elModules.appendChild(CSvg('svg', {
          width: 600,
          height: 350,
        }))
        makePie(svgPie)
        break;
      default:
        break;
    }
  }
}
