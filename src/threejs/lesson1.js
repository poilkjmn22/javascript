/* 
 * @Author: fangqi
 * @Date: 2021-12-15 17:04:23
 * @LastEditors: fangqi
 * @LastEditTime: 2021-12-15 17:04:23
 * @Description: learning threejs : lesson1
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from 'three'
import Stats from 'stats.js'
import * as dat from 'dat.gui'
import TrackballControls from 'three-trackballcontrols'

function init(elContainer) {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, elContainer.clientWidth / elContainer.clientHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // position the cube
    cube.position.set(-4, 3, 0);

    // add the cube to the scene
    scene.add(cube);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777FF,
        wireframe: true
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.set(20, 4, 2);

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    elContainer.appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

function init_light_material(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, elContainer.clientWidth / elContainer.clientHeight, 0.1, 1000);

  // create a render and configure it with shadows
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  // createTree(scene);
  // createHouse(scene);
  // createGroundPlane(scene);
  // createBoundingWall(scene);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 2;
  cube.position.z = 0;

  // add the cube to the scene

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.receiveShadow = true;

  // add the objects
  scene.add(cube);
  scene.add(sphere);
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  // If you want a more detailled shadow you can increase the 
  // mapSize used to draw the shadows.
  // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  scene.add(spotLight);

  var ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  renderer.render(scene, camera);
}

function init_light_material2(elContainer) {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, elContainer.clientWidth / elContainer.clientHeight, 0.1, 1000);

  // create a render and configure it with shadows
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
  renderer.shadowMap.enabled = true;

  createTree(scene);
  createHouse(scene);
  createGroundPlane(scene);
  createBoundingWall(scene);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  // If you want a more detailled shadow you can increase the 
  // mapSize used to draw the shadows.
  // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  scene.add(spotLight);

  var ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);

  // add the output of the renderer to the html element
  elContainer.appendChild(renderer.domElement);

  // call the render function
  renderer.render(scene, camera);

}

function createBoundingWall(scene) {
  var wallLeft = new THREE.CubeGeometry(70, 2, 2);
  var wallRight = new THREE.CubeGeometry(70, 2, 2);
  var wallTop = new THREE.CubeGeometry(2, 2, 50);
  var wallBottom = new THREE.CubeGeometry(2, 2, 50);

  var wallMaterial = new THREE.MeshLambertMaterial({
    color: 0xa0522d
  });

  var wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
  var wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
  var wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
  var wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

  wallLeftMesh.position.set(15, 1, -25);
  wallRightMesh.position.set(15, 1, 25);
  wallTopMesh.position.set(-19, 1, 0);
  wallBottomMesh.position.set(49, 1, 0);

  scene.add(wallLeftMesh);
  scene.add(wallRightMesh);
  scene.add(wallBottomMesh);
  scene.add(wallTopMesh);

}

function createGroundPlane(scene) {
  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(70, 50);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x9acd32
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane)
}

function createHouse(scene) {
  var roof = new THREE.ConeGeometry(5, 4);
  var base = new THREE.CylinderGeometry(5, 5, 6);

  // create the mesh
  var roofMesh = new THREE.Mesh(roof, new THREE.MeshLambertMaterial({
    color: 0x8b7213
  }));
  var baseMesh = new THREE.Mesh(base, new THREE.MeshLambertMaterial({
    color: 0xffe4c4
  }));

  roofMesh.position.set(25, 8, 0);
  baseMesh.position.set(25, 3, 0);

  roofMesh.receiveShadow = true;
  baseMesh.receiveShadow = true;
  roofMesh.castShadow = true;
  baseMesh.castShadow = true;

  scene.add(roofMesh);
  scene.add(baseMesh);
}

/**
 * Add the tree to the scene
 * @param scene The scene to add the tree to
 */
function createTree(scene) {
  var trunk = new THREE.CubeGeometry(1, 8, 1);
  var leaves = new THREE.SphereGeometry(4);

  // create the mesh
  var trunkMesh = new THREE.Mesh(trunk, new THREE.MeshLambertMaterial({
    color: 0x8b4513
  }));
  var leavesMesh = new THREE.Mesh(leaves, new THREE.MeshLambertMaterial({
    color: 0x00ff00
  }));

  // position the trunk. Set y to half of height of trunk
  trunkMesh.position.set(-10, 4, 0);
  leavesMesh.position.set(-10, 12, 0);

  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;
  leavesMesh.castShadow = true;
  leavesMesh.receiveShadow = true;

  scene.add(trunkMesh);
  scene.add(leavesMesh);
}

function init_motion(elContainer) {

    // default setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, elContainer.clientWidth / elContainer.clientHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(elContainer.clientWidth, elContainer.clientHeight);
    renderer.shadowMap.enabled = true;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    var ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 20, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    elContainer.appendChild(renderer.domElement);

    // call the render function
    var step = 0;
    var stats = new Stats();
    stats.dom.style.position = 'absolute';
    elContainer.appendChild(stats.dom);
    stats.showPanel(0);

    const gui = new dat.GUI({
    });
    var controller = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03
    }
    gui.add(controller, 'rotationSpeed', 0, 0.5);
    gui.add(controller, 'bouncingSpeed', 0, 0.5);

    const trackballControls = new TrackballControls(camera, renderer.domElement);
    trackballControls.update();

    renderScene();

    function renderScene() {
        stats.begin();

        // rotate the cube around its axes
        cube.rotation.x += controller.rotationSpeed;
        cube.rotation.y += controller.rotationSpeed;
        cube.rotation.z += controller.rotationSpeed;

        // bounce the sphere up and down
        step += controller.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        trackballControls.update();
        renderer.render(scene, camera);
        stats.end();
    }
}

export {
  init,
  init_light_material,
  init_light_material2,
  init_motion
}
