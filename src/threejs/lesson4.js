/*
 * @Author: fangqi
 * @Date: 2021-12-24 14:30:22
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-12 00:07:01
 * @Description: Mesh
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from "three";
import "three/examples/js/renderers/CanvasRenderer.js"; // 需要做一些特殊处理(ES6模块化导出)
import "three/examples/js/renderers/Projector.js"; // 需要做一些特殊处理(ES6模块化导出)
import "three/examples/js/utils/SceneUtils.js";
import {
  initStats,
  initRenderer,
  initCamera,
  initLessonCateGUI,
  addBasicMaterialSettings,
  loadGopher,
} from "./util.js";
function init_basic_mesh_material(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var camera = initCamera(elContainer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();
  // create a render and set the size
  var webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0x000000));
  webGLRenderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  webGLRenderer.shadowMapEnabled = true;

  var canvasRenderer = new THREE.CanvasRenderer();
  canvasRenderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  let renderer = webGLRenderer;

  var groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  var groundMesh = new THREE.Mesh(
    groundGeom,
    new THREE.MeshBasicMaterial({
      color: 0x777777,
    })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
  var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
  var planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

  var meshMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    name: "Basic Material",
    flatShading: true,
  });

  var sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
  var cube = new THREE.Mesh(cubeGeometry, meshMaterial);
  var plane = new THREE.Mesh(planeGeometry, meshMaterial);

  // position the sphere
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  cube.position.copy(sphere.position);
  plane.position.copy(sphere.position);

  // add the sphere to the scene
  scene.add(cube);

  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 50;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;

    this.color = meshMaterial.color.getStyle();
    this.selectedMesh = "cube";

    this.switchRenderer = function () {
      if (renderer instanceof THREE.WebGLRenderer) {
        renderer = canvasRenderer;
        elContainer.innerHTML = "";
        elContainer.appendChild(renderer.domElement);
      } else {
        renderer = webGLRenderer;
        elContainer.innerHTML = "";
        elContainer.appendChild(renderer.domElement);
      }
    };
  })();

  var gui = initLessonCateGUI();
  var selectedMesh = cube;

  addBasicMaterialSettings(gui, controls, meshMaterial);

  var spGui = gui.addFolder("THREE.MeshBasicMaterial");
  spGui.addColor(controls, "color").onChange(function (e) {
    meshMaterial.color.setStyle(e);
  });
  spGui.add(meshMaterial, "wireframe");
  spGui.add(meshMaterial, "wireframeLinewidth", 0, 20);
  spGui
    .add(meshMaterial, "wireframeLinejoin", ["round", "bevel", "miter"])
    .onChange(function (e) {
      meshMaterial.wireframeLinejoin = e;
    });
  spGui
    .add(meshMaterial, "wireframeLinecap", ["butt", "round", "square"])
    .onChange(function (e) {
      meshMaterial.wireframeLinecap = e;
    });

  loadGopher(meshMaterial).then(function (gopher) {
    gopher.scale.x = 4;
    gopher.scale.y = 4;
    gopher.scale.z = 4;
    gui
      .add(controls, "selectedMesh", ["cube", "sphere", "plane", "gopher"])
      .onChange(function (e) {
        scene.remove(plane);
        scene.remove(cube);
        scene.remove(sphere);
        scene.remove(gopher);

        switch (e) {
          case "cube":
            scene.add(cube);
            selectedMesh = cube;
            break;
          case "sphere":
            scene.add(sphere);
            selectedMesh = sphere;
            break;
          case "plane":
            scene.add(plane);
            selectedMesh = plane;
            break;
          case "gopher":
            scene.add(gopher);
            selectedMesh = gopher;
            break;
        }
      });
  });

  gui.add(controls, "switchRenderer");

  render();

  function render() {
    stats.begin();

    selectedMesh.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_depth_material(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();
  scene.overrideMaterial = new THREE.MeshDepthMaterial();

  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    50,
    110
  );
  camera.position.set(-50, 40, 50);
  camera.lookAt(scene.position);

  // call the render function

  var controls = new (function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    this.addCube = function () {
      var cubeSize = Math.ceil(3 + Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;

      // position the cube randomly in the scene
      cube.position.x = -60 + Math.round(Math.random() * 100);
      cube.position.y = Math.round(Math.random() * 10);
      cube.position.z = -100 + Math.round(Math.random() * 150);

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();
  addBasicMaterialSettings(gui, controls, scene.overrideMaterial);
  var spGui = gui.addFolder("THREE.MeshDepthMaterial");
  spGui.add(scene.overrideMaterial, "wireframe");
  spGui.add(scene.overrideMaterial, "wireframeLinewidth", 0, 20);

  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "addCube");
  gui.add(controls, "removeCube");
  gui.add(controls, "cameraNear", 0, 100).onChange(function (e) {
    camera.near = e;
    camera.updateProjectionMatrix();
  });
  gui.add(controls, "cameraFar", 50, 200).onChange(function (e) {
    camera.far = e;
    camera.updateProjectionMatrix();
  });

  var i = 0;
  while (i < 10) {
    controls.addCube();
    i++;
  }

  render();

  function render() {
    stats.begin();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_combined_material(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    50,
    110
  );
  camera.position.set(-50, 40, 50);
  camera.lookAt(scene.position);

  // call the render function

  var controls = new (function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;
    this.color = 0x00ff00;

    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Group) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    this.addCube = function () {
      var cubeSize = Math.ceil(3 + Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      //var cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
      var cubeMaterial = new THREE.MeshDepthMaterial();
      var colorMaterial = new THREE.MeshBasicMaterial({
        color: controls.color,
        transparent: true,
        blending: THREE.MultiplyBlending,
      });
      var cube = new THREE.SceneUtils1.createMultiMaterialObject(cubeGeometry, [
        colorMaterial,
        cubeMaterial,
      ]);
      cube.children[1].scale.set(0.99, 0.99, 0.99);
      cube.castShadow = true;

      // position the cube randomly in the scene
      cube.position.x = -60 + Math.round(Math.random() * 100);
      cube.position.y = Math.round(Math.random() * 10);
      cube.position.z = -100 + Math.round(Math.random() * 150);

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();
  gui.addColor(controls, "color");
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "addCube");
  gui.add(controls, "removeCube");
  gui.add(controls, "cameraNear", 0, 50).onChange(function (e) {
    camera.near = e;
    camera.updateProjectionMatrix();
  });
  gui.add(controls, "cameraFar", 50, 200).onChange(function (e) {
    camera.far = e;
    camera.updateProjectionMatrix();
  });

  var i = 0;
  while (i < 10) {
    controls.addCube();
    i++;
  }

  render();

  function render() {
    stats.begin();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Group) {
        e.rotation.x += controls.rotationSpeed;
        e.rotation.y += controls.rotationSpeed;
        e.rotation.z += controls.rotationSpeed;
      }
    });

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_mesh_normal_material(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.set(-20, 30, 40);
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  // create a render and set the size
  var renderer;
  var webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0x000000));
  webGLRenderer.setSize(elContainer.clientWidth, elContainer.clientHeight);

  var canvasRenderer = new THREE.CanvasRenderer();
  canvasRenderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer = webGLRenderer;

  var groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  var groundMesh = new THREE.Mesh(
    groundGeom,
    new THREE.MeshBasicMaterial({
      color: 0x777777,
    })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
  var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
  var planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

  var meshMaterial = new THREE.MeshNormalMaterial();
  var sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
  var cube = new THREE.Mesh(cubeGeometry, meshMaterial);
  var plane = new THREE.Mesh(planeGeometry, meshMaterial);

  var selectedMesh = cube;

  // position the sphere
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  for (var f = 0, fl = sphere.geometry.faces.length; f < fl; f++) {
    var face = sphere.geometry.faces[f];
    var centroid = new THREE.Vector3(0, 0, 0);
    centroid.add(sphere.geometry.vertices[face.a]);
    centroid.add(sphere.geometry.vertices[face.b]);
    centroid.add(sphere.geometry.vertices[face.c]);
    centroid.divideScalar(3);

    var arrow = new THREE.ArrowHelper(
      face.normal,
      centroid,
      2,
      0x3333ff,
      0.5,
      0.5
    );
    sphere.add(arrow);
  }

  cube.position.copy(sphere.position);
  plane.position.copy(sphere.position);

  // add the sphere to the scene
  scene.add(cube);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var step = 0;

  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.selectedMesh = "cube";
  })();

  var gui = initLessonCateGUI();
  addBasicMaterialSettings(gui, controls, meshMaterial);

  loadGopher(meshMaterial).then(function (gopher) {
    gopher.scale.x = 4;
    gopher.scale.y = 4;
    gopher.scale.z = 4;
    gui
      .add(controls, "selectedMesh", ["cube", "sphere", "plane", "gopher"])
      .onChange(function (e) {
        scene.remove(plane);
        scene.remove(cube);
        scene.remove(sphere);
        scene.remove(gopher);

        switch (e) {
          case "cube":
            scene.add(cube);
            selectedMesh = cube;
            break;
          case "sphere":
            scene.add(sphere);
            selectedMesh = sphere;
            break;
          case "plane":
            scene.add(plane);
            selectedMesh = plane;
            break;
          case "gopher":
            scene.add(gopher);
            selectedMesh = gopher;
            break;
        }
      });
  });

  render();

  function render() {
    stats.begin();

    selectedMesh.rotation.y = step += 0.01;
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

export {
  init_basic_mesh_material,
  init_depth_material,
  init_combined_material,
  init_mesh_normal_material,
};
