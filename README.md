## three.js不能正确运行的操作
+ /node_modules/threejs/three.module.js文件，去掉export {CanvasRenderer, Projector, SceneUtils, ...} 这几个，然后进入相应的文件，头部加入import * as THREE from "three";
