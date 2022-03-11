/*
 * @Author: fangqi
 * @Date: 2021-12-17 10:42:42
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-12 00:15:51
 * @Description: lesson2: 基本组件
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from 'three';
import { initTrackballControls, initLessonCateGUI, initStats } from './util.js';

function init(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    100
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var stats = initStats(elContainer);

  var controls = new (function () {
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
      var cubeSize = Math.ceil(Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;

      // position the cube randomly in the scene

      cube.position.x =
        -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z =
        -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e != plane) {
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

function init_fog(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 10, 100);

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    100
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -40;
  camera.position.y = 20;
  camera.position.z = 40;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var stats = initStats(elContainer);

  var controls = new (function () {
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
      var cubeSize = Math.ceil(Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;

      // position the cube randomly in the scene

      cube.position.x =
        -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z =
        -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e != plane) {
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

function init_override_material(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();
  scene.overrideMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    100
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -40;
  camera.position.y = 20;
  camera.position.z = 40;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var stats = initStats(elContainer);

  var controls = new (function () {
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
      var cubeSize = Math.ceil(Math.random() * 3);
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;

      // position the cube randomly in the scene

      cube.position.x =
        -30 + Math.round(Math.random() * planeGeometry.parameters.width);
      cube.position.y = Math.round(Math.random() * 5);
      cube.position.z =
        -20 + Math.round(Math.random() * planeGeometry.parameters.height);

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeCube');
  gui.add(controls, 'outputObjects');
  gui.add(controls, 'numberOfObjects').listen();

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    // rotate the cubes around its axes
    scene.traverse(function (e) {
      if (e instanceof THREE.Mesh && e != plane) {
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

function init_geometries(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -50;
  camera.position.y = 30;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(-10, 0, 0));

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, Math.PI / 4, 0, 2);
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.position.set(-40, 30, 30);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add geometries
  addGeometries(scene);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  var stats = initStats(elContainer);

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function addGeometries(scene) {
  var geoms = [];

  geoms.push(new THREE.CylinderGeometry(1, 4, 4));

  // basic cube
  geoms.push(new THREE.BoxGeometry(2, 2, 2));

  // basic spherer
  geoms.push(new THREE.SphereGeometry(2));

  geoms.push(new THREE.IcosahedronGeometry(4));

  // create a convex shape (a shape without dents)
  // using a couple of points
  // for instance a cube
  // var points = [
  //     new THREE.Vector3(2, 2, 2),
  //     new THREE.Vector3(2, 2, -2),
  //     new THREE.Vector3(-2, 2, -2),
  //     new THREE.Vector3(-2, 2, 2),
  //     new THREE.Vector3(2, -2, 2),
  //     new THREE.Vector3(2, -2, -2),
  //     new THREE.Vector3(-2, -2, -2),
  //     new THREE.Vector3(-2, -2, 2)
  // ];
  // geoms.push(new THREE.ConvexGeometry(points));

  // create a lathgeometry
  //http://en.wikipedia.org/wiki/Lathe_(graphics)
  var pts = []; //points array - the path profile points will be stored here
  var detail = 0.1; //half-circle detail - how many angle increments will be used to generate points
  var radius = 3; //radius for half_sphere
  for (
    var angle = 0.0;
    angle < Math.PI;
    angle += detail //loop from 0.0 radians to PI (0 - 180 degrees)
  )
    pts.push(
      new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    ); //angle/radius to x,z
  geoms.push(new THREE.LatheGeometry(pts, 12));

  // create a OctahedronGeometry
  geoms.push(new THREE.OctahedronGeometry(3));

  // create a geometry based on a function
  // geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

  //
  geoms.push(new THREE.TetrahedronGeometry(3));

  geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

  geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

  var j = 0;
  for (var i = 0; i < geoms.length; i++) {
    var cubeMaterial = new THREE.MeshLambertMaterial({
      wireframe: true,
      color: Math.random() * 0xffffff,
    });

    // var materials = [

    //     new THREE.MeshLambertMaterial({
    //         color: Math.random() * 0xffffff
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 0x000000,
    //         wireframe: true
    //     })

    // ];

    // var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
    // mesh.traverse(function (e) {
    //     e.castShadow = true
    // });

    var mesh = new THREE.Mesh(geoms[i], cubeMaterial);
    mesh.castShadow = true;
    mesh.position.x = -24 + (i % 4) * 12;
    mesh.position.y = 4;
    mesh.position.z = -8 + j * 12;

    if ((i + 1) % 4 == 0) j++;
    scene.add(mesh);
  }
}

function init_custom_geom(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 25;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(5, 0, 0));

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x494949);
  scene.add(ambientLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function

  var stats = initStats(elContainer);

  var vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(-1, -1, 1),
  ];

  var faces = [
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(2, 3, 1),
    new THREE.Face3(4, 6, 5),
    new THREE.Face3(6, 7, 5),
    new THREE.Face3(4, 5, 1),
    new THREE.Face3(5, 0, 1),
    new THREE.Face3(7, 6, 2),
    new THREE.Face3(6, 3, 2),
    new THREE.Face3(5, 7, 0),
    new THREE.Face3(7, 2, 0),
    new THREE.Face3(1, 3, 4),
    new THREE.Face3(3, 6, 4),
  ];

  var geom = new THREE.Geometry();
  geom.vertices = vertices;
  geom.faces = faces;
  geom.computeFaceNormals();

  const material = new THREE.MeshLambertMaterial({
    opacity: 0.6,
    color: 0x44ff44,
    transparent: true,
  });

  var mesh = new THREE.Mesh(geom, material);
  mesh.castShadow = true;

  scene.add(mesh);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.position.set(-40, 30, 30);
  spotLight.castShadow = true;
  spotLight.lookAt(mesh);
  scene.add(spotLight);

  function addControl(x, y, z) {
    var controls = new (function () {
      this.x = x;
      this.y = y;
      this.z = z;
    })();

    return controls;
  }

  var controlPoints = [];
  controlPoints.push(addControl(3, 5, 3));
  controlPoints.push(addControl(3, 5, 0));
  controlPoints.push(addControl(3, 0, 3));
  controlPoints.push(addControl(3, 0, 0));
  controlPoints.push(addControl(0, 5, 0));
  controlPoints.push(addControl(0, 5, 3));
  controlPoints.push(addControl(0, 0, 0));
  controlPoints.push(addControl(0, 0, 3));

  var gui = initLessonCateGUI();
  gui.add(
    new (function () {
      this.clone = function () {
        var clonedGeometry = mesh.geometry.clone();

        var mesh2 = new THREE.Mesh(clonedGeometry, material);
        mesh2.castShadow = true;

        mesh2.translateX(5);
        mesh2.translateZ(5);
        mesh2.name = 'clone';
        scene.remove(scene.getChildByName('clone'));
        scene.add(mesh2);
      };
    })(),
    'clone'
  );

  for (var i = 0; i < 8; i++) {
    let f1 = gui.addFolder('Vertices ' + (i + 1));
    f1.add(controlPoints[i], 'x', -10, 10);
    f1.add(controlPoints[i], 'y', -10, 10);
    f1.add(controlPoints[i], 'z', -10, 10);
  }

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    var vertices = [];
    for (var i = 0; i < 8; i++) {
      vertices.push(
        new THREE.Vector3(
          controlPoints[i].x,
          controlPoints[i].y,
          controlPoints[i].z
        )
      );
    }

    mesh.geometry.vertices = vertices;
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.computeFaceNormals();
    delete mesh.geometry.__directGeometry;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_mesh_properties(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.position.set(-40, 30, 30);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function

  var stats = initStats(elContainer);

  var controls = new (function () {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;

    this.positionX = 0;
    this.positionY = 4;
    this.positionZ = 0;

    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.scale = 1;

    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;

    this.visible = true;

    this.translate = function () {
      cube.translateX(controls.translateX);
      cube.translateY(controls.translateY);
      cube.translateZ(controls.translateZ);

      controls.positionX = cube.position.x;
      controls.positionY = cube.position.y;
      controls.positionZ = cube.position.z;
    };
  })();

  var material = new THREE.MeshLambertMaterial({ color: 0x44ff44 });
  var geom = new THREE.BoxGeometry(5, 8, 3);

  var cube = new THREE.Mesh(geom, material);
  cube.position.y = 4;
  cube.castShadow = true;
  scene.add(cube);

  var gui = initLessonCateGUI();

  const guiScale = gui.addFolder('scale');
  guiScale.add(controls, 'scaleX', 0, 5);
  guiScale.add(controls, 'scaleY', 0, 5);
  guiScale.add(controls, 'scaleZ', 0, 5);

  const guiPosition = gui.addFolder('position');
  var contX = guiPosition.add(controls, 'positionX', -10, 10);
  var contY = guiPosition.add(controls, 'positionY', -4, 20);
  var contZ = guiPosition.add(controls, 'positionZ', -10, 10);

  contX.listen();
  contX.onChange(function () {
    cube.position.x = controls.positionX;
  });

  contY.listen();
  contY.onChange(function () {
    cube.position.y = controls.positionY;
  });

  contZ.listen();
  contZ.onChange(function () {
    cube.position.z = controls.positionZ;
  });

  const guiRotation = gui.addFolder('rotation');
  guiRotation.add(controls, 'rotationX', -4, 4);
  guiRotation.add(controls, 'rotationY', -4, 4);
  guiRotation.add(controls, 'rotationZ', -4, 4);

  const guiTranslate = gui.addFolder('translate');

  guiTranslate.add(controls, 'translateX', -10, 10);
  guiTranslate.add(controls, 'translateY', -10, 10);
  guiTranslate.add(controls, 'translateZ', -10, 10);
  guiTranslate.add(controls, 'translate');

  gui.add(controls, 'visible');

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();
    cube.visible = controls.visible;

    cube.rotation.x = controls.rotationX;
    cube.rotation.y = controls.rotationY;
    cube.rotation.z = controls.rotationZ;

    cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_both_cameras(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.x = 120;
  camera.position.y = 60;
  camera.position.z = 180;

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(180, 180);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

  for (var j = 0; j < planeGeometry.parameters.height / 5; j++) {
    for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
      var rnd = Math.random() * 0.75 + 0.25;
      var cubeMaterial = new THREE.MeshLambertMaterial();
      cubeMaterial.color = new THREE.Color(rnd, 0, 0);
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;
      cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
      cube.position.y = 2;

      scene.add(cube);
    }
  }

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-20, 40, 60);
  scene.add(directionalLight);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x292929);
  scene.add(ambientLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function

  var trackballControls;
  var controls = new (function () {
    this.perspective = 'Perspective';
    this.switchCamera = function () {
      if (camera instanceof THREE.PerspectiveCamera) {
        // 正交投影摄像机
        camera = new THREE.OrthographicCamera(
          elContainer.clientWidth / -16,
          elContainer.clientWidth / 16,
          elContainer.clientHeight / 16,
          elContainer.clientHeight / -16,
          -200,
          500
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;
        camera.lookAt(scene.position);

        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = 'Orthographic';
      } else {
        // 透视投影摄像机
        camera = new THREE.PerspectiveCamera(
          45,
          elContainer.clientWidth / elContainer.clientHeight,
          0.1,
          1000
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        camera.lookAt(scene.position);
        trackballControls = initTrackballControls(camera, renderer);
        this.perspective = 'Perspective';
      }
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();

  // make sure that for the first time, the
  // camera is looking at the scene
  camera.lookAt(scene.position);

  trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  var stats = initStats(elContainer);

  render();

  function render() {
    trackballControls.update(clock.getDelta());
    stats.begin();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_camera_lookat(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    elContainer.clientWidth / elContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.x = 120;
  camera.position.y = 60;
  camera.position.z = 180;

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(180, 180);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  for (var j = 0; j < planeGeometry.parameters.height / 5; j++) {
    for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
      var rnd = Math.random() * 0.75 + 0.25;
      var cubeMaterial = new THREE.MeshLambertMaterial();
      cubeMaterial.color = new THREE.Color(rnd, 0, 0);
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;
      cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
      cube.position.y = 2;

      scene.add(cube);
    }
  }

  var lookAtGeom = new THREE.SphereGeometry(2);
  var lookAtMesh = new THREE.Mesh(
    lookAtGeom,
    new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  );
  scene.add(lookAtMesh);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(-20, 40, 60);
  scene.add(directionalLight);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x292929);
  scene.add(ambientLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  var controls = new (function () {
    this.perspective = 'Perspective';
    this.switchCamera = function () {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(
          elContainer.clientWidth / -16,
          elContainer.clientWidth / 16,
          elContainer.clientHeight / 16,
          elContainer.clientHeight / -16,
          -200,
          500
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        camera.lookAt(scene.position);
        this.perspective = 'Orthographic';
      } else {
        camera = new THREE.PerspectiveCamera(
          45,
          elContainer.clientWidth / elContainer.clientHeight,
          0.1,
          1000
        );
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        camera.lookAt(scene.position);
        this.perspective = 'Perspective';
      }
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, 'switchCamera');
  gui.add(controls, 'perspective').listen();

  // make sure that for the first time, the
  // camera is looking at the scene
  //   camera.lookAt(scene.position);

  var step = 0;

  var stats = initStats(elContainer);

  render();

  function render() {
    stats.begin();
    // render using requestAnimationFrame
    step += 0.02;
    if (camera instanceof THREE.Camera) {
      var x = 10 + 100 * Math.sin(step);
      camera.lookAt(new THREE.Vector3(x, 10, 0));
      lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
    }

    //        .position.x = 20+( 10*(Math.cos(step)));
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

export {
  init,
  init_fog,
  init_override_material,
  init_geometries,
  init_custom_geom,
  init_mesh_properties,
  init_both_cameras,
  init_camera_lookat,
};
