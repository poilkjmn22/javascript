/*
 * @Author: fangqi
 * @Date: 2023-01-31 16:04:18
 * @LastEditors: fangqi
 * @LastEditTime: 2023-01-30 17:18:16
 *  @Description: learn threejs , lesson 5
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from "three";
import {
  initStats,
  initRenderer,
  initCanvasRenderer,
  initCamera,
  initTrackballControls,
  initLessonCateGUI,
  addLargeGroundPlane,
  initDefaultLighting,
  applyMeshStandardMaterial,
  applyMeshNormalMaterial,
  redrawGeometryAndUpdateUI,
  createGhostTexture,
} from "./util.js";

function init_sprites(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  var clock = new THREE.Clock();
  var trackballControls = initTrackballControls(camera, renderer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();

  // position and point the camera to the center of the scene
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  createSprites();
  render();

  function createSprites() {
    for (var x = -15; x < 15; x++) {
      for (var y = -10; y < 10; y++) {
        var material = new THREE.SpriteMaterial({
          color: Math.random() * 0xffffff,
        });

        var sprite = new THREE.Sprite(material);
        sprite.position.set(x * 4, y * 4, 0);
        scene.add(sprite);
      }
    }
  }

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_points_webgl(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  var clock = new THREE.Clock();
  var trackballControls = initTrackballControls(camera, renderer);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  createPoints();
  render();

  function createPoints() {
    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      color: 0xffffff,
    });

    for (var x = -15; x < 15; x++) {
      for (var y = -10; y < 10; y++) {
        var particle = new THREE.Vector3(x * 4, y * 4, 0);
        geom.vertices.push(particle);
        geom.colors.push(new THREE.Color(Math.random() * 0xffffff));
      }
    }

    var cloud = new THREE.Points(geom, material);
    scene.add(cloud);
  }

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_basic_point_cloud(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();
  var scene = new THREE.Scene();

  camera.position.set(20, 0, 150);

  var cloud;

  var controls = new (function () {
    this.size = 4;
    this.transparent = true;
    this.opacity = 0.6;
    this.vertexColors = true;
    this.color = 0xffffff;
    this.vertexColor = 0x00ff00;
    this.sizeAttenuation = true;
    this.rotate = true;

    this.redraw = function () {
      console.log(controls.color);

      if (scene.getObjectByName("particles")) {
        scene.remove(scene.getObjectByName("particles"));
      }
      createParticles(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.vertexColors,
        controls.sizeAttenuation,
        controls.color,
        controls.vertexColor
      );
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "size", 0, 10).onChange(controls.redraw);
  gui.add(controls, "transparent").onChange(controls.redraw);
  gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
  gui.add(controls, "vertexColors").onChange(controls.redraw);

  gui.addColor(controls, "color").onChange(controls.redraw);
  gui.addColor(controls, "vertexColor").onChange(controls.redraw);
  gui.add(controls, "sizeAttenuation").onChange(controls.redraw);
  gui.add(controls, "rotate");

  controls.redraw();
  render();

  function createParticles(
    size,
    transparent,
    opacity,
    vertexColors,
    sizeAttenuation,
    colorValue,
    vertexColorValue
  ) {
    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      vertexColors: vertexColors,

      sizeAttenuation: sizeAttenuation,
      color: new THREE.Color(colorValue),
    });

    var range = 500;
    for (var i = 0; i < 15000; i++) {
      var particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      geom.vertices.push(particle);
      var color = new THREE.Color(vertexColorValue);
      var asHSL = {};
      color.getHSL(asHSL);
      color.setHSL(asHSL.h, asHSL.s, asHSL.l * Math.random());
      geom.colors.push(color);
    }

    cloud = new THREE.Points(geom, material);
    cloud.name = "particles";
    scene.add(cloud);
  }

  var step = 0;

  function render() {
    stats.begin();
    trackballControls.update(clock.getDelta());

    if (controls.rotate) {
      step += 0.01;
      cloud.rotation.x = step;
      cloud.rotation.z = step;
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_program_based_sprites(elContainer) {
  var stats = initStats(elContainer);
  var camera = initCamera(new THREE.Vector3(20, 0, 150));
  var canvasRenderer = initCanvasRenderer(elContainer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  var getTexture = function (ctx) {
    // the body
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  };

  createSprites();
  render();

  function createSprites() {
    var material = new THREE.SpriteCanvasMaterial({
      program: getTexture,
    });

    material.rotation = Math.PI;

    var range = 500;
    for (var i = 0; i < 1500; i++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      sprite.scale.set(0.1, 0.1, 0.1);
      scene.add(sprite);
    }
  }

  function render() {
    stats.begin();
    requestAnimationFrame(render);
    canvasRenderer.render(scene, camera);
    stats.end();
  }
}

function init_program_based_points_webgl(elContainer) {
  var stats = initStats(elContainer);
  var camera = initCamera(new THREE.Vector3(20, 0, 150));
  var scene = new THREE.Scene();
  var webGLRenderer = initRenderer(elContainer);

  var cloud;

  var controls = new (function () {
    this.size = 15;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;
    this.rotate = true;
    this.sizeAttenuation = true;

    this.redraw = function () {
      if (scene.getObjectByName("points")) {
        scene.remove(scene.getObjectByName("points"));
      }
      createPoints(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.sizeAttenuation,
        controls.color
      );
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "size", 0, 20).onChange(controls.redraw);
  gui.add(controls, "transparent").onChange(controls.redraw);
  gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
  gui.addColor(controls, "color").onChange(controls.redraw);
  gui.add(controls, "sizeAttenuation").onChange(controls.redraw);
  gui.add(controls, "rotate");
  controls.redraw();

  render();

  function createPoints(size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();

    var material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: createGhostTexture(),
      sizeAttenuation: sizeAttenuation,
      color: color,
    });

    var range = 500;
    for (var i = 0; i < 5000; i++) {
      var particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      geom.vertices.push(particle);
    }

    cloud = new THREE.Points(geom, material);
    cloud.name = "points";
    scene.add(cloud);
  }

  var step = 0;

  function render() {
    stats.begin();
    if (controls.rotate) {
      step += 0.01;
      cloud.rotation.x = step;
      cloud.rotation.z = step;
    }
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }
}

function init_program_based_sprites_webgl(elContainer) {
  var stats = initStats(elContainer);
  var camera = initCamera(new THREE.Vector3(20, 0, 150));
  var scene = new THREE.Scene();
  var webGLRenderer = initRenderer(elContainer);

  createSprites();
  render();

  function createSprites() {
    var material = new THREE.SpriteMaterial({
      map: createGhostTexture(),
      color: 0xffffff,
    });

    var range = 500;
    for (var i = 0; i < 1500; i++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      sprite.scale.set(4, 4, 4);
      scene.add(sprite);
    }
  }

  function render() {
    stats.begin();
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }
}

function init_rainy_scene(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(20, 40, 110));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  var cloud;

  var controls = new (function () {
    this.size = 3;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;

    this.sizeAttenuation = true;

    this.redraw = function () {
      scene.remove(scene.getObjectByName("particles1"));

      createPointCloud(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.sizeAttenuation,
        controls.color
      );
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "size", 0, 20).onChange(controls.redraw);
  gui.add(controls, "transparent").onChange(controls.redraw);
  gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
  gui.addColor(controls, "color").onChange(controls.redraw);
  gui.add(controls, "sizeAttenuation").onChange(controls.redraw);

  controls.redraw();
  render();

  function createPointCloud(
    size,
    transparent,
    opacity,
    sizeAttenuation,
    color
  ) {
    var texture = new THREE.TextureLoader().load(
      "threejs/assets/textures/particles/raindrop-3.png"
    );
    var geom = new THREE.Geometry();

    var material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: texture,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: sizeAttenuation,
      color: color,
    });

    var range = 40;
    for (var i = 0; i < 1500; i++) {
      var particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        // Math.random() * range - range / 2
        1 + i / 100
      );
      particle.velocityY = 0.1 + Math.random() / 5;
      particle.velocityX = (Math.random() - 0.5) / 3;
      geom.vertices.push(particle);
    }

    cloud = new THREE.Points(geom, material);
    cloud.sortParticles = true;
    cloud.name = "particles1";

    scene.add(cloud);
  }

  function render() {
    stats.begin();
    var vertices = cloud.geometry.vertices;
    vertices.forEach(function (v) {
      v.y = v.y - v.velocityY;
      v.x = v.x - v.velocityX;

      if (v.y <= 0) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
    });
    cloud.geometry.verticesNeedUpdate = true;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_snowy_scene(elContainer) {
  var stats = initStats(elContainer);
  var webGLRenderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(20, 40, 110));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  var controls = new (function () {
    this.size = 10;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;

    this.sizeAttenuation = true;

    this.redraw = function () {
      var toRemove = [];
      scene.children.forEach(function (child) {
        if (child instanceof THREE.Points) {
          toRemove.push(child);
        }
      });
      toRemove.forEach(function (child) {
        scene.remove(child);
      });
      createPointInstances(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.sizeAttenuation,
        controls.color
      );
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "size", 0, 20).onChange(controls.redraw);
  gui.add(controls, "transparent").onChange(controls.redraw);
  gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
  gui.addColor(controls, "color").onChange(controls.redraw);
  gui.add(controls, "sizeAttenuation").onChange(controls.redraw);

  controls.redraw();

  render();

  function createPointCloud(
    name,
    texture,
    size,
    transparent,
    opacity,
    sizeAttenuation,
    _color
  ) {
    var geom = new THREE.Geometry();

    const color = new THREE.Color(_color);
    color.setHSL(
      color.getHSL().h,
      color.getHSL().s,
      Math.random() * color.getHSL().l
    );

    var material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: sizeAttenuation,
      color: color,
    });

    var range = 40;
    for (var i = 0; i < 150; i++) {
      var particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        Math.random() * range - range / 2
      );
      particle.velocityY = 0.1 + Math.random() / 5;
      particle.velocityX = (Math.random() - 0.5) / 3;
      particle.velocityZ = (Math.random() - 0.5) / 3;
      geom.vertices.push(particle);
    }

    var system = new THREE.Points(geom, material);
    system.name = name;
    return system;
  }

  function createPointInstances(
    size,
    transparent,
    opacity,
    sizeAttenuation,
    color
  ) {
    var loader = new THREE.TextureLoader();

    var texture1 = loader.load(
      "threejs/assets/textures/particles/snowflake1_t.png"
    );
    var texture2 = loader.load(
      "threejs/assets/textures/particles/snowflake2_t.png"
    );
    var texture3 = loader.load(
      "threejs/assets/textures/particles/snowflake3_t.png"
    );
    var texture4 = loader.load(
      "threejs/assets/textures/particles/snowflake5_t.png"
    );

    scene.add(
      createPointCloud(
        "system1",
        texture1,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPointCloud(
        "system2",
        texture2,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPointCloud(
        "system3",
        texture3,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
    scene.add(
      createPointCloud(
        "system4",
        texture4,
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      )
    );
  }

  function render() {
    stats.begin();

    scene.children.forEach(function (child) {
      if (child instanceof THREE.Points) {
        var vertices = child.geometry.vertices;
        vertices.forEach(function (v) {
          v.y = v.y - v.velocityY;
          v.x = v.x - v.velocityX;
          v.z = v.z - v.velocityZ;

          if (v.y <= 0) v.y = 60;
          if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
          if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
        });

        child.geometry.verticesNeedUpdate = true;
      }
    });

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }
}

function init_sprites2(elContainer) {
  var stats = initStats(elContainer);
  var webGLRenderer = initRenderer(elContainer);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();
  var sceneOrtho = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = initCamera(new THREE.Vector3(0, 0, 50));
  var cameraOrtho = new THREE.OrthographicCamera(
    0,
    window.innerWidth,
    window.innerHeight,
    0,
    -10,
    10
  );

  var material = new THREE.MeshNormalMaterial();
  var geom = new THREE.SphereGeometry(15, 20, 20);
  var mesh = new THREE.Mesh(geom, material);

  scene.add(mesh);

  var getTexture = function () {
    var texture = new THREE.TextureLoader().load(
      "threejs/assets/textures/particles/sprite-sheet.png"
    );
    return texture;
  };

  var controls = new (function () {
    this.size = 150;
    this.sprite = 0;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;
    this.rotateSystem = true;

    this.redraw = function () {
      sceneOrtho.children.forEach(function (child) {
        if (child instanceof THREE.Sprite) sceneOrtho.remove(child);
      });
      createSprite(
        controls.size,
        controls.transparent,
        controls.opacity,
        controls.color,
        controls.sprite
      );
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "sprite", 0, 4).step(1).onChange(controls.redraw);
  gui.add(controls, "size", 0, 120).onChange(controls.redraw);
  gui.add(controls, "transparent").onChange(controls.redraw);
  gui.add(controls, "opacity", 0, 1).onChange(controls.redraw);
  gui.addColor(controls, "color").onChange(controls.redraw);

  controls.redraw();

  render();

  function createSprite(size, transparent, opacity, color, spriteNumber) {
    var spriteMaterial = new THREE.SpriteMaterial({
      opacity: opacity,
      color: color,
      transparent: transparent,
      map: getTexture(),
    });

    // we have 1 row, with five sprites
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.blending = THREE.AdditiveBlending;
    // make sure the object is always rendered at the front
    spriteMaterial.depthTest = false;

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(100, 50, -10);
    sprite.velocityX = 5;

    sceneOrtho.add(sprite);
  }

  var step = 0;

  function render() {
    stats.begin();

    camera.position.y = Math.sin((step += 0.01)) * 20;

    sceneOrtho.children.forEach(function (e) {
      if (e instanceof THREE.Sprite) {
        // move the sprite along the bottom
        e.position.x = e.position.x + e.velocityX;
        if (e.position.x > window.innerWidth) {
          e.velocityX = -5;
          controls.sprite += 1;
          e.material.map.offset.set((1 / 5) * (controls.sprite % 4), 0);
        }
        if (e.position.x < 0) {
          e.velocityX = 5;
        }
      }
    });

    requestAnimationFrame(render);

    webGLRenderer.render(scene, camera);
    webGLRenderer.autoClear = false;
    webGLRenderer.render(sceneOrtho, cameraOrtho);
    stats.end();
  }
}

function init_sprites2_3d(elContainer) {
  var stats = initStats(elContainer);
  var webGLRenderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(20, 0, 150));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  createSprites();
  render();

  var group;

  function getTexture() {
    var texture = new THREE.TextureLoader().load(
      "threejs/assets/textures/particles/sprite-sheet.png"
    );
    return texture;
  }

  function createSprites() {
    group = new THREE.Object3D();
    var range = 200;
    for (var i = 0; i < 400; i++) {
      group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
    }
    scene.add(group);
  }

  function createSprite(
    size,
    transparent,
    opacity,
    color,
    spriteNumber,
    range
  ) {
    var spriteMaterial = new THREE.SpriteMaterial({
      opacity: opacity,
      color: color,
      transparent: transparent,
      map: getTexture(),
    });

    // we have 1 row, with five sprites
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;

    spriteMaterial.blending = THREE.AdditiveBlending;

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2
    );

    return sprite;
  }

  function render() {
    stats.begin();
    group.rotation.x += 0.01;

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }
}

function create_partical_system_from_model(elContainer) {
  var stats = initStats(elContainer);
  var webGLRenderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(-30, 40, 50));

  // call the render function
  var step = 0;

  var knot;

  // setup the control gui
  var controls = new (function () {
    // we need the first child, since it's a multimaterial
    this.radius = 13;
    this.tube = 1.7;
    this.radialSegments = 156;
    this.tubularSegments = 12;
    this.p = 5;
    this.q = 4;
    this.asParticles = false;
    this.rotate = false;

    this.redraw = function () {
      // remove the old plane
      if (knot) scene.remove(knot);
      // create a new one
      var geom = new THREE.TorusKnotGeometry(
        controls.radius,
        controls.tube,
        Math.round(controls.radialSegments),
        Math.round(controls.tubularSegments),
        Math.round(controls.p),
        Math.round(controls.q)
      );

      if (controls.asParticles) {
        knot = createPoints(geom);
      } else {
        knot = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());
      }

      // add it to the scene.
      scene.add(knot);
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "radius", 0, 40).onChange(controls.redraw);
  gui.add(controls, "tube", 0, 40).onChange(controls.redraw);
  gui.add(controls, "radialSegments", 0, 400).step(1).onChange(controls.redraw);
  gui.add(controls, "tubularSegments", 1, 20).step(1).onChange(controls.redraw);
  gui.add(controls, "p", 1, 10).step(1).onChange(controls.redraw);
  gui.add(controls, "q", 1, 15).step(1).onChange(controls.redraw);
  gui.add(controls, "asParticles").onChange(controls.redraw);
  gui.add(controls, "rotate").onChange(controls.redraw);

  controls.redraw();

  render();

  // from THREE.js examples
  function generateSprite() {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext("2d");
    var gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(0,255,255,1)");
    gradient.addColorStop(0.4, "rgba(0,0,64,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createPoints(geom) {
    var material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: generateSprite(),
      depthWrite: false, // instead of sortParticles
    });

    var cloud = new THREE.Points(geom, material);
    return cloud;
  }

  function render() {
    stats.begin();

    if (controls.rotate) {
      knot.rotation.y = step += 0.01;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }
}

export {
  init_sprites,
  init_points_webgl,
  init_basic_point_cloud,
  init_program_based_sprites,
  init_program_based_points_webgl,
  init_program_based_sprites_webgl,
  init_rainy_scene,
  init_snowy_scene,
  init_sprites2,
  init_sprites2_3d,
  create_partical_system_from_model,
};
