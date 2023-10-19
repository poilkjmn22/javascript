import { CSvg } from "@/utils/svg.js";
import { empty } from "@/utils/dom.js";
import { addLessonGUIControls, deleteGUI } from "@/threejs/util.js";

export default class NotecateLoader {
  constructor() {}
  static async load(notecate, comp) {
    const { elModules } = comp.refs;
    empty(elModules);
    deleteGUI("lessonGUI");
    deleteGUI("lessonCateGUI");

    let cateExports = null;
    switch (notecate.replace(/\./g, "-")) {
      case "深度优先遍历":
        console.log("dfs");
        break;
      case "async":
        // import('@/base/async.js')
        //   .then((module) => {
        //   })
        //   .catch(console.error)
        // import('@/deep/generator.js')
        //   .then((module) => {
        //   })
        //   .catch(console.error)
        import("@/deep/async.js")
          .then((module) => {
            console.log(module);
          })
          .catch(console.error);
        break;
      case "正则表达式":
        // const { camelCase } = await import('@/regexp/word.js')
        // console.log(camelCase('  border-bottom-width'))
        // console.log(camelCase('border bottom width'))
        // console.log(camelCase('border_bottom_width'))
        break;
      case "生成器，组件，布局":
        const { makeSymbols, makeLines, makeCurves, makePie } = await import(
          "@/d3/maker.js"
        );
        const svgSymbols = elModules.appendChild(
          CSvg("svg", {
            class: "shapes",
          })
        );
        makeSymbols(svgSymbols);

        const svgLines = elModules.appendChild(
          CSvg("svg", {
            class: "lines",
          })
        );
        makeLines(svgLines);

        const svgCurves = elModules.appendChild(
          CSvg("svg", {
            width: 700,
            height: 670,
          })
        );
        makeCurves(svgCurves);

        const svgPie = elModules.appendChild(
          CSvg("svg", {
            width: 600,
            height: 350,
          })
        );
        makePie(svgPie);
        break;
      case "d3-data":
        const data = await import("@/d3/data.js");
        addLessonGUIControls(data, elModules);
        break;
      case "d3-scales":
        const scales = await import("@/d3/scales.js");
        addLessonGUIControls(scales, elModules);
        break;
      case "d3-axes":
        const axes = await import("@/d3/axes.js");
        addLessonGUIControls(axes, elModules);
        break;
      case "d3-animation":
        const animation = await import("@/d3/animation.js");
        addLessonGUIControls(animation, elModules);
        break;
      case "d3-interaction":
        const interaction = await import("@/d3/interaction.js");
        addLessonGUIControls(interaction, elModules);
        break;
      case "d3-path":
        const path = await import("@/d3/path.js");
        addLessonGUIControls(path, elModules);
        break;
      case "d3-layout":
        const layout = await import("@/d3/layout.js");
        addLessonGUIControls(layout, elModules);
        break;
      case "DOM":
        const { getDimensions } = await import("@/base/dom/helper.js");
        const img = document.createElement("img");
        img.src = "sakura.jpeg";
        img.style.width = "100%";
        img.addEventListener("load", (e) => {
          const target = e.target;
          console.log(target.offsetWidth, target.offsetHeight);
        });
        elModules.appendChild(img);

        const img2 = document.createElement("img");
        img2.src = "bridge.jpeg";
        img2.style.width = "50%";
        // img2.style.display = 'none'
        img2.addEventListener("load", (e) => {
          const target = e.target;
          console.log(target.offsetWidth, target.offsetHeight);

          setTimeout(() => console.log(getDimensions(target)), 2000);
        });
        elModules.appendChild(img2);
        break;
      case "迭代器":
        const iterator = await import("@/base/iterator/index.js");
        addLessonGUIControls(iterator, elModules);

        break;
      case "生成器":
        const generator = await import("@/base/generator/index.js");
        addLessonGUIControls(generator, elModules);

        break;
      case "异步编程":
        const async = await import("@/base/async/index.js");
        addLessonGUIControls(async, elModules);

        break;
      case "set":
        const { init } = await import("@/lib/set.js");
        init();
        break;
      case "lesson1":
        const lesson1 = await import("@/threejs/lesson1.js");
        addLessonGUIControls(lesson1, elModules);
        break;
      case "lesson2":
        const lesson2 = await import("@/threejs/lesson2.js");
        addLessonGUIControls(lesson2, elModules);
        break;
      case "lesson3":
        const lesson3 = await import("@/threejs/lesson3.js");
        addLessonGUIControls(lesson3, elModules);
        break;
      case "lesson4":
        const lesson4 = await import("@/threejs/lesson4.js");
        addLessonGUIControls(lesson4, elModules);
        break;
      case "lesson5":
        const lesson5 = await import("@/threejs/lesson5.js");
        addLessonGUIControls(lesson5, elModules);
        break;
      case "lesson6":
        const lesson6 = await import("@/threejs/lesson6.js");
        addLessonGUIControls(lesson6, elModules);
        break;
      case "lesson7":
        const lesson7 = await import("@/threejs/lesson7.js");
        addLessonGUIControls(lesson7, elModules);
        break;
      case "lesson8":
        const lesson8 = await import("@/threejs/lesson8.js");
        addLessonGUIControls(lesson8, elModules);
        break;
      case "lesson9":
        const lesson9 = await import("@/threejs/lesson9.js");
        addLessonGUIControls(lesson9, elModules);
        break;
      case "分支":
        const branch = await import("@/git/branch.js");
        addLessonGUIControls(branch, elModules);
        break;
      case "远程连接":
        const ssh = await import("@/linux/ssh.js");
        addLessonGUIControls(ssh, elModules);
        break;
      case "栈":
        cateExports = await import(
          "@/algorithms/data-structure/stack/index.js"
        );
        addLessonGUIControls(cateExports, elModules);
        break;
      case "队列":
        cateExports = await import(
          "@/algorithms/data-structure/queue/index.js"
        );
        addLessonGUIControls(cateExports, elModules);
        break;
      case "最大堆":
        cateExports = await import("@/algorithms/data-structure/heap/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "有根树":
        cateExports = await import("@/algorithms/data-structure/tree/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "二叉搜索树":
        cateExports = await import(
          "@/algorithms/data-structure/binary-search-tree/index.js"
        );
        addLessonGUIControls(cateExports, elModules);
        break;
      case "整数Trie":
        cateExports = await import(
          "@/algorithms/data-structure/trie/drawTrie.js"
        );
        addLessonGUIControls(cateExports, elModules);
        break;
      case "邻接矩阵":
        cateExports = await import(
          "@/algorithms/data-structure/graph/index.js"
        );
        addLessonGUIControls(cateExports, elModules);
        break;
      case "基本零件":
        cateExports = await import("@/geometry/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "碰撞检测":
        cateExports = await import("@/geometry/collisionDetection/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "其他几何问题":
        cateExports = await import("@/geometry/otherProblems/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "搜索算法":
        cateExports = await import("@/algorithms/search/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "KMP算法":
        cateExports = await import("@/algorithms/string/index.js");
        addLessonGUIControls(cateExports, elModules);
        break;
      case "后缀数组":
        cateExports = await import(
          "@/algorithms/string/suffixArray/example.js"
        );
        console.log(cateExports);
        addLessonGUIControls(cateExports, elModules);
        break;
      default:
        break;
    }
  }
}
