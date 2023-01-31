/*
 * @Author: fangqi
 * @Date: 2023-01-30 17:18:16
 * @LastEditors: fangqi
 * @LastEditTime: 2023-01-30 17:18:16
 *  @Description: learn threejs , lesson 5
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from "three";
import {
  initStats,
  initRenderer,
  initCamera,
  initLessonCateGUI,
  addLargeGroundPlane,
  initDefaultLighting,
  applyMeshStandardMaterial,
  applyMeshNormalMaterial,
  redrawGeometryAndUpdateUI,
} from "./util.js";

function init_basic2d_geometry_plane(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -10;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.planeGeometry = new THREE.PlaneGeometry(20, 20, 4, 4);
    this.width = this.planeGeometry.parameters.width;
    this.height = this.planeGeometry.parameters.height;
    this.widthSegments = this.planeGeometry.parameters.widthSegments;
    this.heightSegments = this.planeGeometry.parameters.heightSegments;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.PlaneGeometry(
          controls.width,
          controls.height,
          Math.round(controls.widthSegments),
          Math.round(controls.heightSegments)
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "width", 0, 40).onChange(controls.redraw);
  gui.add(controls, "height", 0, 40).onChange(controls.redraw);
  gui.add(controls, "widthSegments", 0, 10).onChange(controls.redraw);
  gui.add(controls, "heightSegments", 0, 10).onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic2d_geometry_circle(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -10;

  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    var self = this;

    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.radius = 4;
    this.thetaStart = 0.3 * Math.PI * 2;
    this.thetaLength = 0.3 * Math.PI * 2;
    this.segments = 10;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.CircleGeometry(
          self.radius,
          self.segments,
          self.thetaStart,
          self.thetaLength
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radius", 0, 40).onChange(controls.redraw);
  gui.add(controls, "segments", 0, 40).onChange(controls.redraw);
  gui.add(controls, "thetaStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "thetaLength", 0, 2 * Math.PI).onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic2d_geometry_ring(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -10;

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.innerRadius = 3;
    this.outerRadius = 10;
    this.thetaSegments = 8;
    this.phiSegments = 8;
    this.thetaStart = 0;
    this.thetaLength = Math.PI * 2;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.RingGeometry(
          controls.innerRadius,
          controls.outerRadius,
          controls.thetaSegments,
          controls.phiSegments,
          controls.thetaStart,
          controls.thetaLength
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "innerRadius", 0, 40).onChange(controls.redraw);
  gui.add(controls, "outerRadius", 0, 100).onChange(controls.redraw);
  gui.add(controls, "thetaSegments", 1, 40).step(1).onChange(controls.redraw);
  gui.add(controls, "phiSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "thetaStart", 0, Math.PI * 2).onChange(controls.redraw);
  gui.add(controls, "thetaLength", 0, Math.PI * 2).onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function drawShape() {
  // create a basic shape
  var shape = new THREE.Shape();

  // startpoint
  shape.moveTo(10, 10);

  // straight line upwards
  shape.lineTo(10, 40);

  // the top of the figure, curve to the right
  shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

  // spline back down
  shape.splineThru([
    new THREE.Vector2(32, 30),
    new THREE.Vector2(28, 20),
    new THREE.Vector2(30, 10),
  ]);

  // curve at the bottom
  shape.quadraticCurveTo(20, 15, 10, 10);

  // add 'eye' hole one
  var hole1 = new THREE.Path();
  hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
  shape.holes.push(hole1);

  // add 'eye hole 2'
  var hole2 = new THREE.Path();
  hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
  shape.holes.push(hole2);

  // add 'mouth'
  var hole3 = new THREE.Path();
  hole3.absarc(20, 16, 2, 0, Math.PI, true);
  shape.holes.push(hole3);

  // return the shape
  return shape;
}

function init_basic2d_geometry_shape(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    var self = this;
    this.curveSegments = 12;

    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.ShapeGeometry(
          drawShape(),
          self.curveSegments
        ).center();
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "curveSegments", 1, 100, 1).onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_cube(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    var baseGeom = new THREE.BoxGeometry(4, 10, 10, 4, 4, 4);
    this.width = baseGeom.parameters.width;
    this.height = baseGeom.parameters.height;
    this.depth = baseGeom.parameters.depth;

    this.widthSegments = baseGeom.parameters.widthSegments;
    this.heightSegments = baseGeom.parameters.heightSegments;
    this.depthSegments = baseGeom.parameters.depthSegments;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.BoxGeometry(
          controls.width,
          controls.height,
          controls.depth,
          Math.round(controls.widthSegments),
          Math.round(controls.heightSegments),
          Math.round(controls.depthSegments)
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "width", 0, 40).onChange(controls.redraw);
  gui.add(controls, "height", 0, 40).onChange(controls.redraw);
  gui.add(controls, "depth", 0, 40).onChange(controls.redraw);
  gui.add(controls, "widthSegments", 0, 10).onChange(controls.redraw);
  gui.add(controls, "heightSegments", 0, 10).onChange(controls.redraw);
  gui.add(controls, "depthSegments", 0, 10).onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_sphere(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    var baseSphere = new THREE.SphereGeometry(4, 10, 10);
    this.radius = baseSphere.parameters.radius;
    this.widthSegments = baseSphere.parameters.widthSegments;
    this.heightSegments = baseSphere.parameters.heightSegments;
    this.phiStart = 0;
    this.phiLength = Math.PI * 2;
    this.thetaStart = 0;
    this.thetaLength = Math.PI;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.SphereGeometry(
          controls.radius,
          controls.widthSegments,
          controls.heightSegments,
          controls.phiStart,
          controls.phiLength,
          controls.thetaStart,
          controls.thetaLength
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radius", 0, 40).onChange(controls.redraw);
  gui.add(controls, "widthSegments", 0, 20).onChange(controls.redraw);
  gui.add(controls, "heightSegments", 0, 20).onChange(controls.redraw);
  gui.add(controls, "phiStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "phiLength", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "thetaStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "thetaLength", 0, 2 * Math.PI).onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_cylinder(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.radiusTop = 20;
    this.radiusBottom = 20;
    this.height = 20;
    this.radialSegments = 8;
    this.heightSegments = 8;
    this.openEnded = false;
    this.thetaStart = 0;
    this.thetaLength = 2 * Math.PI;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.CylinderGeometry(
          controls.radiusTop,
          controls.radiusBottom,
          controls.height,
          controls.radialSegments,
          controls.heightSegments,
          controls.openEnded,
          controls.thetaStart,
          controls.thetaLength
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radiusTop", -40, 40).onChange(controls.redraw);
  gui.add(controls, "radiusBottom", -40, 40).onChange(controls.redraw);
  gui.add(controls, "height", 0, 40).onChange(controls.redraw);
  gui.add(controls, "radialSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "heightSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "openEnded").onChange(controls.redraw);
  gui.add(controls, "thetaStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "thetaLength", 0, 2 * Math.PI).onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_cone(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.radiusTop = 20;
    this.radiusBottom = 20;
    this.height = 20;
    this.radialSegments = 8;
    this.heightSegments = 8;
    this.openEnded = false;
    this.thetaStart = 0;
    this.thetaLength = 2 * Math.PI;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.CylinderGeometry(
          controls.radiusTop,
          controls.radiusBottom,
          controls.height,
          controls.radialSegments,
          controls.heightSegments,
          controls.openEnded,
          controls.thetaStart,
          controls.thetaLength
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radiusTop", -40, 40).onChange(controls.redraw);
  gui.add(controls, "radiusBottom", -40, 40).onChange(controls.redraw);
  gui.add(controls, "height", 0, 40).onChange(controls.redraw);
  gui.add(controls, "radialSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "heightSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "openEnded").onChange(controls.redraw);
  gui.add(controls, "thetaStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "thetaLength", 0, 2 * Math.PI).onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_torus(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    var baseGeom = new THREE.TorusGeometry(10, 10, 8, 6, Math.PI * 2);
    this.radius = baseGeom.parameters.radius;
    this.tube = baseGeom.parameters.tube;
    this.radialSegments = baseGeom.parameters.radialSegments;
    this.tubularSegments = baseGeom.parameters.tubularSegments;
    this.arc = baseGeom.parameters.arc;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return new THREE.TorusGeometry(
          controls.radius,
          controls.tube,
          Math.round(controls.radialSegments),
          Math.round(controls.tubularSegments),
          controls.arc
        );
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radius", 0, 40).onChange(controls.redraw);
  gui.add(controls, "tube", 0, 40).onChange(controls.redraw);
  gui.add(controls, "radialSegments", 0, 40).onChange(controls.redraw);
  gui.add(controls, "tubularSegments", 1, 20).onChange(controls.redraw);
  gui.add(controls, "arc", 0, Math.PI * 2).onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic3d_geometry_polyhedron(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -10;

  // setup the control parts of the ui
  var controls = new (function () {
    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.radius = 10;
    this.detail = 0;
    this.type = "Icosahedron";

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        var polyhedron;
        switch (controls.type) {
          case "Icosahedron":
            polyhedron = new THREE.IcosahedronGeometry(
              controls.radius,
              controls.detail
            );
            break;
          case "Tetrahedron":
            polyhedron = new THREE.TetrahedronGeometry(
              controls.radius,
              controls.detail
            );
            break;
          case "Octahedron":
            polyhedron = new THREE.OctahedronGeometry(
              controls.radius,
              controls.detail
            );
            break;
          case "Dodecahedron":
            polyhedron = new THREE.DodecahedronGeometry(
              controls.radius,
              controls.detail
            );
            break;
          case "Custom":
            var vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1];

            var indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];

            polyhedron = new THREE.PolyhedronGeometry(
              vertices,
              indices,
              controls.radius,
              controls.detail
            );
            break;
        }

        return polyhedron;
      });
    };
  })();

  // create the GUI with the specific settings for this geometry
  var gui = initLessonCateGUI();
  gui.add(controls, "radius", 0, 40).step(1).onChange(controls.redraw);
  gui.add(controls, "detail", 0, 3).step(1).onChange(controls.redraw);
  gui
    .add(controls, "type", [
      "Icosahedron",
      "Tetrahedron",
      "Octahedron",
      "Dodecahedron",
      "Custom",
    ])
    .onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  var step = 0;
  // call the render function
  render();
  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.01;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

export {
  init_basic2d_geometry_plane,
  init_basic2d_geometry_circle,
  init_basic2d_geometry_ring,
  init_basic2d_geometry_shape,
  init_basic3d_geometry_cube,
  init_basic3d_geometry_sphere,
  init_basic3d_geometry_cylinder,
  init_basic3d_geometry_cone,
  init_basic3d_geometry_torus,
  init_basic3d_geometry_polyhedron,
};
