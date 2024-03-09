/*
 * @Author: fangqi
 * @Date: 2023-01-31 16:04:18
 * @LastEditors: fangqi
 * @LastEditTime: 2023-01-30 17:18:16
 *  @Description: learn threejs , lesson 5
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import * as THREE from "three";
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry.js";
import transformSVGPath from "./transformSVGPath.js";
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

function init_advanced_3d_geometry_convex(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  var step = 0;
  var spGroup;

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return generatePoints();
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "redraw");
  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  controls.redraw();
  render();

  function generatePoints() {
    if (spGroup) scene.remove(spGroup);
    // add 10 random spheres
    var points = [];
    for (var i = 0; i < 20; i++) {
      var randomX = -15 + Math.round(Math.random() * 30);
      var randomY = -15 + Math.round(Math.random() * 30);
      var randomZ = -15 + Math.round(Math.random() * 30);

      points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false,
    });
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.copy(point);
      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a convexgeometry
    var convexGeometry = new ConvexGeometry(points);
    convexGeometry.computeVertexNormals();
    convexGeometry.computeFaceNormals();
    convexGeometry.normalsNeedUpdate = true;
    return convexGeometry;
  }

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    if (spGroup) {
      spGroup.rotation.y = step;
      spGroup.rotation.x = step;
      spGroup.rotation.z = step;
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_advanced_3d_geometry_lathe(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  // the points group
  var spGroup;

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.segments = 12;
    this.phiStart = 0;
    this.phiLength = 2 * Math.PI;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return generatePoints(
          controls.segments,
          controls.phiStart,
          controls.phiLength
        );
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "segments", 0, 50).step(1).onChange(controls.redraw);
  gui.add(controls, "phiStart", 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, "phiLength", 0, 2 * Math.PI).onChange(controls.redraw);

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
  gui.add(controls, "redraw");

  function generatePoints(segments, phiStart, phiLength) {
    if (spGroup) scene.remove(spGroup);

    var points = [];
    var height = 5;
    var count = 30;
    for (var i = 0; i < count; i++) {
      points.push(
        new THREE.Vector2(
          (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
          i - count + count / 2
        )
      );
    }

    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false,
    });
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);

      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a LatheGeometry
    var latheGeometry = new THREE.LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    return latheGeometry;
  }

  var step = 0;
  controls.redraw();
  render();

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    if (spGroup) {
      spGroup.rotation.y = step;
      spGroup.rotation.x = step;
      spGroup.rotation.z = step;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_extrude_geometry(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  // call the render function
  var step = 0;

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.amount = 2;
    this.bevelThickness = 2;
    this.bevelSize = 0.5;
    this.bevelEnabled = true;
    this.bevelSegments = 3;
    this.bevelEnabled = true;
    this.curveSegments = 12;
    this.steps = 1;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        var options = {
          amount: controls.amount,
          bevelThickness: controls.bevelThickness,
          bevelSize: controls.bevelSize,
          bevelSegments: controls.bevelSegments,
          bevelEnabled: controls.bevelEnabled,
          curveSegments: controls.curveSegments,
          steps: controls.steps,
        };

        var geom = new THREE.ExtrudeGeometry(drawShape(), options);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));
        geom.applyMatrix(new THREE.Matrix4().makeScale(0.4, 0.4, 0.4));
        return geom;
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "amount", 0, 20).onChange(controls.redraw);
  gui.add(controls, "bevelThickness", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSize", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSegments", 0, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "bevelEnabled").onChange(controls.redraw);
  gui.add(controls, "curveSegments", 1, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "steps", 1, 5).step(1).onChange(controls.redraw);

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

  controls.redraw();
  render();

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_extrude_tube(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  var step = 0;
  var spGroup;

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.numberOfPoints = 5;
    this.segments = 64;
    this.radius = 1;
    this.radiusSegments = 8;
    this.closed = false;
    this.points = [];
    // we need the first child, since it's a multimaterial

    this.newPoints = function () {
      var points = [];
      for (var i = 0; i < controls.numberOfPoints; i++) {
        var randomX = -20 + Math.round(Math.random() * 50);
        var randomY = -15 + Math.round(Math.random() * 40);
        var randomZ = -20 + Math.round(Math.random() * 40);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
      }
      controls.points = points;
      controls.redraw();
    };

    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        return generatePoints(
          controls.points,
          controls.segments,
          controls.radius,
          controls.radiusSegments,
          controls.closed
        );
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "newPoints");
  gui
    .add(controls, "numberOfPoints", 2, 15)
    .step(1)
    .onChange(controls.newPoints);
  gui.add(controls, "segments", 0, 200).step(1).onChange(controls.redraw);
  gui.add(controls, "radius", 0, 10).onChange(controls.redraw);
  gui.add(controls, "radiusSegments", 0, 100).step(1).onChange(controls.redraw);
  gui.add(controls, "closed").onChange(controls.redraw);

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

  controls.newPoints();

  render();

  function generatePoints(points, segments, radius, radiusSegments, closed) {
    // add n random spheres

    if (spGroup) scene.remove(spGroup);
    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false,
    });
    points.forEach(function (point) {
      var spGeom = new THREE.SphereGeometry(0.2);
      var spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.copy(point);
      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      segments,
      radius,
      radiusSegments,
      closed
    );
  }

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    if (spGroup) {
      spGroup.rotation.y = step;
      spGroup.rotation.x = step;
      spGroup.rotation.z = step;
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_extrude_svg(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();

  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  // call the render function
  var step = 0;

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.amount = 2;
    this.bevelThickness = 2;
    this.bevelSize = 0.5;
    this.bevelEnabled = true;
    this.bevelSegments = 3;
    this.bevelEnabled = true;
    this.curveSegments = 12;
    this.steps = 1;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        var options = {
          amount: controls.amount,
          bevelThickness: controls.bevelThickness,
          bevelSize: controls.bevelSize,
          bevelSegments: controls.bevelSegments,
          bevelEnabled: controls.bevelEnabled,
          curveSegments: controls.curveSegments,
          steps: controls.steps,
        };

        var geom = new THREE.ExtrudeGeometry(drawShape(), options);
        geom.applyMatrix(new THREE.Matrix4().makeScale(0.05, 0.05, 0.05));
        geom.center();

        return geom;
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "amount", 0, 20).onChange(controls.redraw);
  gui.add(controls, "bevelThickness", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSize", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSegments", 0, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "bevelEnabled").onChange(controls.redraw);
  gui.add(controls, "curveSegments", 1, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "steps", 1, 5).step(1).onChange(controls.redraw);

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

  function drawShape() {
    var svgString = document.querySelector("#batman-path").getAttribute("d");

    var shape = transformSVGPath(svgString);

    // return the shape
    return shape;
  }

  controls.redraw();
  render();

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_parametric_geometry(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  // position and point the camera to the center of the scene
  // camera.position.set(-80, 80, 80);
  // camera.lookAt(new THREE.Vector3(60, -60, 0));

  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  // call the render function
  var step = 0;

  const klein = function (u, v, optionalTarget) {
    var result = optionalTarget || new THREE.Vector3();

    u *= Math.PI;
    v *= 2 * Math.PI;

    u = u * 2;
    var x, y, z;
    if (u < Math.PI) {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
      z =
        -8 * Math.sin(u) -
        2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
    }

    y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    return result.set(x, y, z);
  };

  const radialWave = function (u, v, optionalTarget) {
    var result = optionalTarget || new THREE.Vector3();
    var r = 50;

    var x = Math.sin(u) * r;
    var z = Math.sin(v / 2) * 2 * r;
    var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

    return result.set(x, y, z);
  };

  // setup the control gui
  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;
    this.slices = 50;
    this.stacks = 50;

    this.renderFunction = "radialWave";

    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        let geom = null;
        switch (controls.renderFunction) {
          case "radialWave":
            geom = new THREE.ParametricGeometry(
              radialWave,
              controls.slices,
              controls.stacks
            );
            geom.center();
            return geom;

          case "klein":
            geom = new THREE.ParametricGeometry(
              klein,
              controls.slices,
              controls.stacks
            );
            geom.center();
            return geom;
        }
      });
    };
  })();
  var gui = initLessonCateGUI();
  gui
    .add(controls, "renderFunction", ["radialWave", "klein"])
    .onChange(controls.redraw);
  gui
    .add(controls, "appliedMaterial", {
      meshNormal: applyMeshNormalMaterial,
      meshStandard: applyMeshStandardMaterial,
    })
    .onChange(controls.redraw);

  gui.add(controls, "slices", 10, 120, 1).onChange(controls.redraw);
  gui.add(controls, "stacks", 10, 120, 1).onChange(controls.redraw);
  gui.add(controls, "castShadow").onChange(function (e) {
    controls.mesh.castShadow = e;
  });
  gui.add(controls, "groundPlaneVisible").onChange(function (e) {
    groundPlane.material.visible = e;
  });

  controls.redraw();
  render();

  function render() {
    stats.begin();
    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function init_text_geometry(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var camera = initCamera();
  var scene = new THREE.Scene();
  initDefaultLighting(scene);
  var groundPlane = addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  var font_bitstream;
  var font_helvetiker_bold;
  var font_helvetiker_regular;

  var step = 0;

  var fontload1 = new THREE.FontLoader();
  fontload1.load(
    "threejs/assets/fonts/bitstream_vera_sans_mono_roman.typeface.json",
    function (response) {
      controls.font = response;
      font_bitstream = response;
      controls.redraw();
      render();
    }
  );

  var fontload2 = new THREE.FontLoader();
  fontload2.load(
    "threejs/assets/fonts/helvetiker_bold.typeface.json",
    function (response) {
      font_helvetiker_bold = response;
    }
  );

  var fontload3 = new THREE.FontLoader();
  fontload3.load(
    "threejs/assets/fonts/helvetiker_regular.typeface.json",
    function (response) {
      font_helvetiker_regular = response;
    }
  );

  var controls = new (function () {
    this.appliedMaterial = applyMeshNormalMaterial;
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.size = 90;
    this.height = 90;
    this.bevelThickness = 2;
    this.bevelSize = 0.5;
    this.bevelEnabled = true;
    this.bevelSegments = 3;
    this.bevelEnabled = true;
    this.curveSegments = 12;
    this.steps = 1;
    this.fontName = "bitstream vera sans mono";

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      switch (controls.fontName) {
        case "bitstream vera sans mono":
          controls.font = font_bitstream;
          break;
        case "helvetiker":
          controls.font = font_helvetiker_regular;
          break;
        case "helvetiker bold":
          controls.font = font_helvetiker_bold;
          break;
      }

      redrawGeometryAndUpdateUI(gui, scene, controls, function () {
        var options = {
          size: controls.size,
          height: controls.height,
          weight: controls.weight,
          font: controls.font,
          bevelThickness: controls.bevelThickness,
          bevelSize: controls.bevelSize,
          bevelSegments: controls.bevelSegments,
          bevelEnabled: controls.bevelEnabled,
          curveSegments: controls.curveSegments,
          steps: controls.steps,
        };

        var geom = new THREE.TextGeometry("Learning Three.js", options);
        geom.applyMatrix(new THREE.Matrix4().makeScale(0.05, 0.05, 0.05));
        geom.center();

        return geom;
      });
    };
  })();

  var gui = initLessonCateGUI();
  gui.add(controls, "size", 0, 200).onChange(controls.redraw);
  gui.add(controls, "height", 0, 200).onChange(controls.redraw);
  gui
    .add(controls, "fontName", [
      "bitstream vera sans mono",
      "helvetiker",
      "helvetiker bold",
    ])
    .onChange(controls.redraw);
  gui.add(controls, "bevelThickness", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSize", 0, 10).onChange(controls.redraw);
  gui.add(controls, "bevelSegments", 0, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "bevelEnabled").onChange(controls.redraw);
  gui.add(controls, "curveSegments", 1, 30).step(1).onChange(controls.redraw);
  gui.add(controls, "steps", 1, 5).step(1).onChange(controls.redraw);

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

  function render() {
    stats.begin();

    controls.mesh.rotation.y = step += 0.005;
    controls.mesh.rotation.x = step;
    controls.mesh.rotation.z = step;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

export {
  init_advanced_3d_geometry_convex,
  init_advanced_3d_geometry_lathe,
  init_extrude_geometry,
  init_extrude_tube,
  init_extrude_svg,
  init_parametric_geometry,
  init_text_geometry,
};
