/* 
 * @Author: fangqi
 * @Date: 2021-12-17 14:42:29
 * @LastEditors: fangqi
 * @LastEditTime: 2021-12-17 14:42:29
 * @Description: utils
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import TrackballControls from 'three-trackballcontrols'
import * as dat from 'dat.gui'
import { empty } from '@/utils/dom.js'

function initTrackballControls(camera, renderer) {
    var trackballControls = new TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}

function addLessonGUIControls(objLesson, elModules) {
  var gui = initLessonCateGUI({ width: 350 }, 'lessonGUI')
  gui.domElement.style.float = "left"
  const controls = {}
  for(const cate in objLesson) {
    controls[cate] = function() {
      empty(elModules)
      objLesson[cate](elModules)
    }
    gui.add(controls, cate)
  }
}

function deleteGUI(guiName) {
  if (window[guiName]) {
    window[guiName].destroy()
    delete window[guiName]
  }
}

function initLessonCateGUI(options = {}, guiName = 'lessonCateGUI') {
  deleteGUI(guiName)
  window[guiName] = new dat.GUI(options)
  return window[guiName]
}

export {
  initTrackballControls,
  addLessonGUIControls,
  initLessonCateGUI,
  deleteGUI,
}
