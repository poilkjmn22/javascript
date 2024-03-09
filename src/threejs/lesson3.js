/*
 * @Author: fangqi
 * @Date: 2021-12-20 15:34:48
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-12 00:10:00
 * @Description: Lesson 3
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from "three";
import {Lensflare} from "three/examples/jsm/objects/Lensflare.js"; // 需要做一些特殊处理(ES6模块化导出)
import {
  initStats,
  initRenderer,
  initCamera,
  initLessonCateGUI,
  addHouseAndTree,
  addDefaultCubeAndSphere,
  addGroundPlane,
  initTrackballControls,
} from "./util.js";

function init_ambient_light(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // add ambient lighting
  var ambientLight = new THREE.AmbientLight("#606008", 1);
  scene.add(ambientLight);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
  spotLight.shadow.mapSize.set(2048, 2048);
  spotLight.position.set(-30, 40, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add a simple scene
  addHouseAndTree(scene);

  // add controls
  setupControls();

  // call the render function
  render();

  function render() {
    stats.begin();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }

  function setupControls() {
    var controls = new (function () {
      this.intensity = ambientLight.intensity;
      this.ambientColor = ambientLight.color.getStyle();
      this.disableSpotlight = false;
    })();

    var gui = initLessonCateGUI();
    gui.add(controls, "intensity", 0, 3, 0.1).onChange(function () {
      ambientLight.color = new THREE.Color(controls.ambientColor);
      ambientLight.intensity = controls.intensity;
    });
    gui.addColor(controls, "ambientColor").onChange(function () {
      ambientLight.color = new THREE.Color(controls.ambientColor);
      ambientLight.intensity = controls.intensity;
    });
    gui.add(controls, "disableSpotlight").onChange(function (e) {
      spotLight.visible = !e;
    });

    return controls;
  }
}

function init_spot_light(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  var cubeAndSphere = addDefaultCubeAndSphere(scene);
  var cube = cubeAndSphere.cube;
  var sphere = cubeAndSphere.sphere;
  var plane = addGroundPlane(scene);

  // add subtle ambient lighting
  var ambiColor = "#1c1c1c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 30, -10);
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  // add target and light
  var target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  var spotLight = new THREE.SpotLight("#ffffff");
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 100;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.angle = 0.4;
  spotLight.shadow.camera.fov = 120;
  scene.add(spotLight);
  var debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);

  var pp = new THREE.SpotLightHelper(spotLight);
  scene.add(pp);

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xac6c25,
  });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;

  sphereLightMesh.position.set(3, 20, 3);
  scene.add(sphereLightMesh);

  // for controlling the rendering
  var step = 0;
  var invert = 1;
  var phase = 0;

  var controls = setupControls();
  render();

  function render() {
    stats.begin();
    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // move the light simulation
    if (!controls.stopMovingLight) {
      if (phase > 2 * Math.PI) {
        invert = invert * -1;
        phase -= 2 * Math.PI;
      } else {
        phase += controls.rotationSpeed;
      }
      sphereLightMesh.position.z = +(7 * Math.sin(phase));
      sphereLightMesh.position.x = +(14 * Math.cos(phase));
      sphereLightMesh.position.y = 15;

      if (invert < 0) {
        var pivot = 14;
        sphereLightMesh.position.x =
          invert * (sphereLightMesh.position.x - pivot) + pivot;
      }

      spotLight.position.copy(sphereLightMesh.position);
    }

    pp.update();
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }

  function setupControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.03;
      this.bouncingSpeed = 0.03;
      this.ambientColor = ambiColor;
      this.pointColor = spotLight.color.getStyle();
      this.intensity = 1;
      this.distance = 0;
      this.angle = 0.1;
      this.shadowDebug = false;
      this.castShadow = true;
      this.target = "Plane";
      this.stopMovingLight = false;
      this.penumbra = 0;
    })();

    var gui = initLessonCateGUI();
    gui.addColor(controls, "ambientColor").onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, "pointColor").onChange(function (e) {
      spotLight.color = new THREE.Color(e);
    });

    gui.add(controls, "angle", 0, Math.PI * 2).onChange(function (e) {
      spotLight.angle = e;
    });

    gui.add(controls, "intensity", 0, 5).onChange(function (e) {
      spotLight.intensity = e;
    });

    gui.add(controls, "penumbra", 0, 1).onChange(function (e) {
      spotLight.penumbra = e;
    });

    gui.add(controls, "distance", 0, 200).onChange(function (e) {
      spotLight.distance = e;
    });

    gui.add(controls, "shadowDebug").onChange(function (e) {
      if (e) {
        scene.add(debugCamera);
      } else {
        scene.remove(debugCamera);
      }
    });

    gui.add(controls, "castShadow").onChange(function (e) {
      spotLight.castShadow = e;
    });

    gui
      .add(controls, "target", ["Plane", "Sphere", "Cube"])
      .onChange(function (e) {
        switch (e) {
          case "Plane":
            spotLight.target = plane;
            break;
          case "Sphere":
            spotLight.target = sphere;
            break;
          case "Cube":
            spotLight.target = cube;
            break;
        }
      });

    gui.add(controls, "stopMovingLight").onChange(function (e) {
      controls.stopMovingLight = e;
    });

    return controls;
  }
}

function init_point_light(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);

  var camera = initCamera();
  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // add a simple scene
  addHouseAndTree(scene);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight("#0c0c0c");
  scene.add(ambientLight);

  // the point light where working with
  var pointColor = "#ccffcc";
  var pointLight = new THREE.PointLight(pointColor);
  pointLight.decay = 0.1;

  pointLight.castShadow = true;

  scene.add(pointLight);

  var helper = new THREE.PointLightHelper(pointLight);
  // scene.add(helper);

  var shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  // scene.add(shadowHelper)

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xac6c25,
  });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.position.set(3, 0, 5);
  scene.add(sphereLightMesh);

  // call the render function

  // used to determine the switch point for the light animation
  var invert = 1;
  var phase = 0;

  var controls = setupControls();
  render();

  function render() {
    helper.update();
    shadowHelper.update();

    stats.begin();
    pointLight.position.copy(sphereLightMesh.position);
    trackballControls.update(clock.getDelta());

    // move the light simulation
    if (phase > 2 * Math.PI) {
      invert = invert * -1;
      phase -= 2 * Math.PI;
    } else {
      phase += controls.rotationSpeed;
    }
    sphereLightMesh.position.z = +(25 * Math.sin(phase));
    sphereLightMesh.position.x = +(14 * Math.cos(phase));
    sphereLightMesh.position.y = 5;

    if (invert < 0) {
      var pivot = 14;
      sphereLightMesh.position.x =
        invert * (sphereLightMesh.position.x - pivot) + pivot;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }

  function setupControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.01;
      this.bouncingSpeed = 0.03;
      this.ambientColor = ambientLight.color.getStyle();
      this.pointColor = pointLight.color.getStyle();
      this.intensity = 1;
      this.distance = pointLight.distance;
    })();

    var gui = initLessonCateGUI();
    gui.addColor(controls, "ambientColor").onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, "pointColor").onChange(function (e) {
      pointLight.color = new THREE.Color(e);
    });

    gui.add(controls, "distance", 0, 100).onChange(function (e) {
      pointLight.distance = e;
    });

    gui.add(controls, "intensity", 0, 3).onChange(function (e) {
      pointLight.intensity = e;
    });

    return controls;
  }
}

function init_directional_light(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  camera.position.set(-80, 80, 80);
  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = -5;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // add subtle ambient lighting
  var ambiColor = "#1c1c1c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  var target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  var pointColor = "#ff5808";
  var directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(-40, 60, -10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 80;
  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;

  directionalLight.intensity = 0.5;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  scene.add(directionalLight);
  var shadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera);

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xac6c25,
  });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;

  sphereLightMesh.position.set(3, 20, 3);
  scene.add(sphereLightMesh);
  // call the render function
  var step = 0;

  var controls = new (function () {
    this.rotationSpeed = 0.03;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.pointColor = pointColor;
    this.intensity = 0.5;
    this.debug = false;
    this.castShadow = true;
    this.onlyShadow = false;
    this.target = "Plane";
  })();

  var gui = initLessonCateGUI();

  gui.addColor(controls, "ambientColor").onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
  });

  gui.addColor(controls, "pointColor").onChange(function (e) {
    directionalLight.color = new THREE.Color(e);
  });

  gui.add(controls, "intensity", 0, 5).onChange(function (e) {
    directionalLight.intensity = e;
  });

  gui.add(controls, "debug").onChange(function (e) {
    e ? scene.add(shadowCamera) : scene.remove(shadowCamera);
  });

  gui.add(controls, "castShadow").onChange(function (e) {
    directionalLight.castShadow = e;
  });

  gui.add(controls, "onlyShadow").onChange(function (e) {
    directionalLight.onlyShadow = e;
  });

  gui
    .add(controls, "target", ["Plane", "Sphere", "Cube"])
    .onChange(function (e) {
      console.log(e);
      switch (e) {
        case "Plane":
          directionalLight.target = plane;
          break;
        case "Sphere":
          directionalLight.target = sphere;
          break;
        case "Cube":
          directionalLight.target = cube;
          break;
      }
    });

  render();

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());

    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    sphereLightMesh.position.z = -8;
    sphereLightMesh.position.y = +(27 * Math.sin(step / 3));
    sphereLightMesh.position.x = 10 + 26 * Math.cos(step / 3);

    directionalLight.position.copy(sphereLightMesh.position);

    // render using requestAnimationFrame
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    stats.end();
  }
}

function init_hemisphere_light(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane
  var textureGrass = new THREE.TextureLoader().load(
    "textures/ground/grasslight-big.jpg"
  );
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    map: textureGrass,
  });

  //        var planeMaterial = new THREE.MeshLambertMaterial();
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
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x7777ff,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  var target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
  hemiLight.position.set(0, 500, 0);
  scene.add(hemiLight);

  var pointColor = "#ffffff";
  var dirLight = new THREE.DirectionalLight(pointColor);
  dirLight.position.set(30, 10, -50);
  dirLight.castShadow = true;
  dirLight.target = plane;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  // call the render function
  var step = 0;

  // used to determine the switch point for the light animation
  var controls = addControls();

  render();

  function render() {
    stats.begin();

    trackballControls.update(clock.getDelta());

    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }

  function addControls() {
    var controls = new (function () {
      this.rotationSpeed = 0.03;
      this.bouncingSpeed = 0.03;
      this.hemisphere = true;
      this.color = 0x0000ff;
      this.groundColor = 0x00ff00;
      this.intensity = 0.6;
    })();

    var gui = initLessonCateGUI();

    gui.add(controls, "hemisphere").onChange(function (e) {
      if (!e) {
        hemiLight.intensity = 0;
      } else {
        hemiLight.intensity = controls.intensity;
      }
    });
    gui.addColor(controls, "groundColor").onChange(function (e) {
      hemiLight.groundColor = new THREE.Color(e);
    });
    gui.addColor(controls, "color").onChange(function (e) {
      hemiLight.color = new THREE.Color(e);
    });
    gui.add(controls, "intensity", 0, 5).onChange(function (e) {
      hemiLight.intensity = e;
    });

    return controls;
  }
}

function init_area_light(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer, {
    antialias: true,
  });
  var camera = initCamera();

  camera.position.set(-50, 30, 50);
  // camera.lookAt(new THREE.Vector3(0, 0, -35));

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
  var planeMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.044676705160855, // calculated from shininess = 1000
    metalness: 0.0,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // plane.receiveShadow  = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // call the render function

  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.intensity = 0.1;
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  var areaLight1 = new THREE.RectAreaLight(0xff0000, 500, 4, 10);
  areaLight1.position.set(-10, 10, -35);
  scene.add(areaLight1);

  var areaLight2 = new THREE.RectAreaLight(0x00ff00, 500, 4, 10);
  areaLight2.position.set(0, 10, -35);
  scene.add(areaLight2);

  var areaLight3 = new THREE.RectAreaLight(0x0000ff, 500, 4, 10);
  areaLight3.position.set(10, 10, -35);
  scene.add(areaLight3);

  var planeGeometry1 = new THREE.BoxGeometry(4, 10, 0);
  var planeGeometry1Mat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  var plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
  plane1.position.copy(areaLight1.position);
  scene.add(plane1);

  var planeGeometry2 = new THREE.BoxGeometry(4, 10, 0);
  var planeGeometry2Mat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });
  var plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);

  plane2.position.copy(areaLight2.position);
  scene.add(plane2);

  var planeGeometry3 = new THREE.BoxGeometry(4, 10, 0);
  var planeGeometry3Mat = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  });
  var plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);

  plane3.position.copy(areaLight3.position);
  scene.add(plane3);

  var controls = new (function () {
    this.rotationSpeed = 0.02;
    this.color1 = 0xff0000;
    this.intensity1 = 500;
    this.color2 = 0x00ff00;
    this.intensity2 = 500;
    this.color3 = 0x0000ff;
    this.intensity3 = 500;
  })();

  var gui = initLessonCateGUI();
  gui.addColor(controls, "color1").onChange(function (e) {
    areaLight1.color = new THREE.Color(e);
    planeGeometry1Mat.color = new THREE.Color(e);
    scene.remove(plane1);
    plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
    plane1.position.copy(areaLight1.position);
    scene.add(plane1);
  });
  gui.add(controls, "intensity1", 0, 1000).onChange(function (e) {
    areaLight1.intensity = e;
  });
  gui.addColor(controls, "color2").onChange(function (e) {
    areaLight2.color = new THREE.Color(e);
    planeGeometry2Mat.color = new THREE.Color(e);
    scene.remove(plane2);
    plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
    plane2.position.copy(areaLight2.position);
    scene.add(plane2);
  });
  gui.add(controls, "intensity2", 0, 1000).onChange(function (e) {
    areaLight2.intensity = e;
  });
  gui.addColor(controls, "color3").onChange(function (e) {
    areaLight3.color = new THREE.Color(e);
    planeGeometry3Mat.color = new THREE.Color(e);
    scene.remove(plane3);
    plane3 = new THREE.Mesh(planeGeometry1, planeGeometry3Mat);
    plane3.position.copy(areaLight3.position);
    scene.add(plane3);
  });
  gui.add(controls, "intensity3", 0, 1000).onChange(function (e) {
    areaLight3.intensity = e;
  });

  render();

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_lensflares(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer, {
    alpha: true,
  });

  var camera = initCamera();
  camera.position.x = -20;
  camera.position.y = 10;
  camera.position.z = 45;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create the ground plane
  var textureGrass = new THREE.TextureLoader().load(
    "textures/ground/grasslight-big.jpg"
  );
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    map: textureGrass,
  });
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
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // add subtle ambient lighting
  var ambiColor = "#1c1c1c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  // add spotlight for a bit of light
  var spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  var target = new THREE.Object3D();
  target.position.set(5, 0, 0);

  var pointColor = "#ffffff";
  //    var spotLight = new THREE.SpotLight( pointColor);
  var spotLight = new THREE.DirectionalLight(pointColor);
  spotLight.position.set(30, 10, -50);
  spotLight.castShadow = true;
  spotLight.shadowCameraNear = 0.1;
  spotLight.shadowCameraFar = 100;
  spotLight.shadowCameraFov = 50;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.shadowCameraNear = 2;
  spotLight.shadowCameraFar = 200;
  spotLight.shadowCameraLeft = -100;
  spotLight.shadowCameraRight = 100;
  spotLight.shadowCameraTop = 100;
  spotLight.shadowCameraBottom = -100;
  spotLight.shadowMapWidth = 2048;
  spotLight.shadowMapHeight = 2048;

  scene.add(spotLight);

  // call the render function
  var step = 0;

  // used to determine the switch point for the light animation

  var controls = new (function () {
    this.rotationSpeed = 0.03;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.pointColor = pointColor;
    this.intensity = 0.1;
    this.distance = 0;
    this.exponent = 30;
    this.angle = 0.1;
    this.debug = false;
    this.castShadow = true;
    this.onlyShadow = false;
    this.target = "Plane";
  })();

  var gui = initLessonCateGUI();
  gui.addColor(controls, "ambientColor").onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
  });

  gui.addColor(controls, "pointColor").onChange(function (e) {
    spotLight.color = new THREE.Color(e);
  });

  gui.add(controls, "intensity", 0, 5).onChange(function (e) {
    spotLight.intensity = e;
  });

  var textureFlare0 = THREE.ImageUtils.loadTexture(
    "textures/flares/lensflare0.png"
  );
  var textureFlare3 = THREE.ImageUtils.loadTexture(
    "textures/flares/lensflare3.png"
  );

  var flareColor = new THREE.Color(0xffaacc);

  var lensFlare = new Lensflare();

  lensFlare.addElement(
    new LensflareElement(textureFlare0, 350, 0.0, flareColor)
  );
  lensFlare.addElement(
    new LensflareElement(textureFlare3, 60, 0.6, flareColor)
  );
  lensFlare.addElement(
    new LensflareElement(textureFlare3, 70, 0.7, flareColor)
  );
  lensFlare.addElement(
    new LensflareElement(textureFlare3, 120, 0.9, flareColor)
  );
  lensFlare.addElement(
    new LensflareElement(textureFlare3, 70, 1.0, flareColor)
  );
  spotLight.add(lensFlare);

  render();

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());
    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

export {
  init_ambient_light,
  init_spot_light,
  init_point_light,
  init_directional_light,
  init_hemisphere_light,
  init_area_light,
  init_lensflares,
};
