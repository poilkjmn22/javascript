/*
 * @Author: fangqi
 * @Date: 2023-02-03 11:10:26
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
  initTrackballControls,
  initLessonCateGUI,
  addGroundPlane,
  initDefaultLighting,
} from "./util.js";

function basic_animation(elContainer) {
  const stats = initStats(elContainer);
  const scene = new THREE.Scene();
  const renderer = initRenderer(elContainer);
  const camera = initCamera();
  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  initDefaultLighting(scene);

  const groundPlane = addGroundPlane(scene);
  groundPlane.position.y = 0;

  // create a cube
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -10;
  cube.position.y = 4;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;
  // add the sphere to the scene
  scene.add(sphere);

  const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
  const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x77ff77 });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.castShadow = true;
  cylinder.position.set(0, 0, 1);

  scene.add(cylinder);

  // add subtle ambient lighting
  const ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);

  // call the render function
  let step = 0;

  const controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.scalingSpeed = 0.03;
  })();

  const gui = initLessonCateGUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);
  gui.add(controls, "scalingSpeed", 0, 0.5);

  let scalingStep = 0;
  renderScene();

  function renderScene() {
    stats.begin();
    trackballControls.update(clock.getDelta());

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // scale the cylinder
    scalingStep += controls.scalingSpeed;
    const scaleX = Math.abs(Math.sin(scalingStep / 4));
    const scaleY = Math.abs(Math.cos(scalingStep / 5));
    const scaleZ = Math.abs(Math.sin(scalingStep / 7));
    cylinder.scale.set(scaleX, scaleY, scaleZ);

    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
    stats.end();
  }
}

function select_objects(elContainer) {
  const stats = initStats(elContainer);
  const scene = new THREE.Scene();
  const renderer = initRenderer(elContainer);
  const camera = initCamera();
  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  initDefaultLighting(scene);

  // document.getElementById("webgl-output")
  elContainer.addEventListener("mousedown", onDocumentMouseDown, false);
  elContainer.addEventListener("mousemove", onDocumentMouseMove, false);

  const groundPlane = addGroundPlane(scene);
  groundPlane.position.y = 0;

  // create a cube
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -10;
  cube.position.y = 4;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;
  // add the sphere to the scene
  scene.add(sphere);

  const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
  const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x77ff77 });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.castShadow = true;
  cylinder.position.set(0, 0, 1);

  scene.add(cylinder);

  // add subtle ambient lighting
  const ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);

  // call the render function
  let step = 0;
  let scalingStep = 0;

  let tube;

  const controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.scalingSpeed = 0.03;
    this.showRay = false;
  })();

  const gui = initLessonCateGUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);
  gui.add(controls, "scalingSpeed", 0, 0.5);
  gui.add(controls, "showRay").onChange(function () {
    if (tube) scene.remove(tube);
  });

  renderScene();

  function renderScene() {
    stats.begin();

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // scale the cylinder
    scalingStep += controls.scalingSpeed;
    const scaleX = Math.abs(Math.sin(scalingStep / 4));
    const scaleY = Math.abs(Math.cos(scalingStep / 5));
    const scaleZ = Math.abs(Math.sin(scalingStep / 7));
    cylinder.scale.set(scaleX, scaleY, scaleZ);

    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
    stats.end();
  }

  function onDocumentMouseDown(event) {
    const { left, top } = elContainer.getBoundingClientRect();
    let vector = new THREE.Vector3(
      ((event.clientX - left) / elContainer.innerWidth) * 2 - 1,
      -((event.clientY - top) / elContainer.innerHeight) * 2 + 1,
      0.5
    );
    vector = vector.unproject(camera);

    const raycaster = new THREE.Raycaster(
      camera.position,
      vector.sub(camera.position).normalize()
    );
    const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

    if (intersects.length > 0) {
      console.log(intersects[0]);
      intersects[0].object.material.transparent = true;
      intersects[0].object.material.opacity = 0.1;
    }
  }

  function onDocumentMouseMove(event) {
    if (controls.showRay) {
      const { left, top } = elContainer.getBoundingClientRect();
      let vector = new THREE.Vector3(
        ((event.clientX - left) / elContainer.innerWidth) * 2 - 1,
        -((event.clientY - top) / elContainer.innerHeight) * 2 + 1,
        0.5
      );
      vector = vector.unproject(camera);

      const raycaster = new THREE.Raycaster(
        camera.position,
        vector.sub(camera.position).normalize()
      );
      const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

      if (intersects.length > 0) {
        const points = [];
        points.push(new THREE.Vector3(-30, 39.8, 30));
        points.push(intersects[0].point);

        const mat = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.6,
        });
        const tubeGeometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points),
          60,
          0.001
        );

        if (tube) scene.remove(tube);

        if (controls.showRay) {
          tube = new THREE.Mesh(tubeGeometry, mat);
          scene.add(tube);
        }
      }
    }
  }
}
export { basic_animation, select_objects };
