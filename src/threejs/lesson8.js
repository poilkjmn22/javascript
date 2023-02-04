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
  initLessonCateGUI,
  addLargeGroundPlane,
  initDefaultLighting,
} from "./util.js";
import BaseLoaderScene from "./BaseLoaderScene.js";
import "three/examples/js/loaders/MTLLoader.js";
import "three/examples/js/loaders/ColladaLoader.js";
import "three/examples/js/loaders/STLLoader.js";
import "three/examples/js/loaders/VTKLoader.js";
import "three/examples/js/loaders/PDBLoader.js";
import "three/examples/js/loaders/PLYLoader.js";
import "three/examples/js/loaders/AWDLoader.js";
import "three/examples/js/loaders/AssimpJSONLoader.js";
import "three/examples/js/loaders/VRMLLoader.js";
import "three/examples/js/loaders/BabylonLoader.js";
import "three/examples/js/loaders/SVGLoader.js";

function init_group(elContainer) {
  // use the defaults
  var stats = initStats(elContainer);
  var webGLRenderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  initDefaultLighting(scene);
  addLargeGroundPlane(scene);

  // call the render function
  var step = 0.03;

  var sphere;
  var cube;
  var group;
  var bboxMesh;
  var arrow;

  // setup the control gui
  var controls = new (function () {
    // we need the first child, since it's a multimaterial
    this.cubePosX = 0;
    this.cubePosY = 3;
    this.cubePosZ = 10;

    this.spherePosX = 10;
    this.spherePosY = 5;
    this.spherePosZ = 0;

    this.groupPosX = 10;
    this.groupPosY = 5;
    this.groupPosZ = 0;

    this.grouping = false;
    this.rotate = false;

    this.groupScale = 1;
    this.cubeScale = 1;
    this.sphereScale = 1;

    this.redraw = function () {
      // remove the old plane
      scene.remove(group);

      // create a new one
      sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
      cube = createMesh(new THREE.BoxGeometry(6, 6, 6));

      sphere.position.set(
        controls.spherePosX,
        controls.spherePosY,
        controls.spherePosZ
      );
      sphere.scale.set(
        controls.sphereScale,
        controls.sphereScale,
        controls.sphereScale
      );
      cube.position.set(
        controls.cubePosX,
        controls.cubePosY,
        controls.cubePosZ
      );
      cube.scale.set(
        controls.cubeScale,
        controls.cubeScale,
        controls.cubeScale
      );

      // also create a group, only used for rotating
      group = new THREE.Group();
      group.position.set(
        controls.groupPosX,
        controls.groupPosY,
        controls.groupPosZ
      );
      group.scale.set(
        controls.groupScale,
        controls.groupScale,
        controls.groupScale
      );
      group.add(sphere);
      group.add(cube);

      scene.add(group);
      controls.positionBoundingBox();

      if (arrow) scene.remove(arrow);
      arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        group.position,
        10,
        0x0000ff
      );
      scene.add(arrow);
    };

    this.positionBoundingBox = function () {
      scene.remove(bboxMesh);
      var box = setFromObject(group);
      var width = box.max.x - box.min.x;
      var height = box.max.y - box.min.y;
      var depth = box.max.z - box.min.z;

      var bbox = new THREE.BoxGeometry(width, height, depth);
      bboxMesh = new THREE.Mesh(
        bbox,
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          vertexColors: THREE.VertexColors,
          wireframeLinewidth: 2,
          wireframe: true,
        })
      );

      // scene.add(bboxMesh);

      bboxMesh.position.x = (box.min.x + box.max.x) / 2;
      bboxMesh.position.y = (box.min.y + box.max.y) / 2;
      bboxMesh.position.z = (box.min.z + box.max.z) / 2;
    };
  })();

  var gui = initLessonCateGUI();
  var sphereFolder = gui.addFolder("sphere");
  sphereFolder.add(controls, "spherePosX", -20, 20).onChange(function (e) {
    sphere.position.x = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  sphereFolder.add(controls, "spherePosZ", -20, 20).onChange(function (e) {
    sphere.position.z = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  sphereFolder.add(controls, "spherePosY", -20, 20).onChange(function (e) {
    sphere.position.y = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  sphereFolder.add(controls, "sphereScale", 0, 3).onChange(function (e) {
    sphere.scale.set(e, e, e);
    controls.positionBoundingBox();
    controls.redraw();
  });

  var cubeFolder = gui.addFolder("cube");
  cubeFolder.add(controls, "cubePosX", -20, 20).onChange(function (e) {
    cube.position.x = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  cubeFolder.add(controls, "cubePosZ", -20, 20).onChange(function (e) {
    cube.position.z = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  cubeFolder.add(controls, "cubePosY", -20, 20).onChange(function (e) {
    cube.position.y = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  cubeFolder.add(controls, "cubeScale", 0, 3).onChange(function (e) {
    cube.scale.set(e, e, e);
    controls.positionBoundingBox();
    controls.redraw();
  });

  var groupFolder = gui.addFolder("group");
  groupFolder.add(controls, "groupPosX", -20, 20).onChange(function (e) {
    group.position.x = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  groupFolder.add(controls, "groupPosZ", -20, 20).onChange(function (e) {
    group.position.z = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  groupFolder.add(controls, "groupPosY", -20, 20).onChange(function (e) {
    group.position.y = e;
    controls.positionBoundingBox();
    controls.redraw();
  });
  groupFolder.add(controls, "groupScale", 0, 3).onChange(function (e) {
    group.scale.set(e, e, e);
    controls.positionBoundingBox();
    controls.redraw();
  });

  gui.add(controls, "grouping");
  gui.add(controls, "rotate");
  controls.redraw();
  render();

  function createMesh(geom) {
    // assign two materials
    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;

    // create a multimaterial
    var plane = new THREE.Mesh(geom, meshMaterial);

    return plane;
  }

  function render() {
    stats.begin();
    if (controls.grouping && controls.rotate) {
      group.rotation.y += step;
    }

    if (controls.rotate && !controls.grouping) {
      sphere.rotation.y += step;
      cube.rotation.y += step;
    }

    //        controls.positionBoundingBox();
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    stats.end();
  }

  // http://jsfiddle.net/MREL4/
  function setFromObject(object) {
    var box = new THREE.Box3();
    var v1 = new THREE.Vector3();
    object.updateMatrixWorld(true);
    box.makeEmpty();
    object.traverse(function (node) {
      if (node.geometry !== undefined && node.geometry.vertices !== undefined) {
        var vertices = node.geometry.vertices;
        for (var i = 0, il = vertices.length; i < il; i++) {
          v1.copy(vertices[i]);
          v1.applyMatrix4(node.matrixWorld);
          box.expandByPoint(v1);
        }
      }
    });
    return box;
  }
}

function init_merging(elContainer) {
  var stats = initStats(elContainer);
  var renderer = initRenderer(elContainer);
  var scene = new THREE.Scene();
  var camera = initCamera(new THREE.Vector3(0, 40, 50));

  camera.lookAt(scene.position);

  // call the render function
  var cubeMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
  });
  var controls = new (function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.combined = false;

    this.numberOfObjects = 500;

    this.redraw = function () {
      var toRemove = [];
      scene.traverse(function (e) {
        if (e instanceof THREE.Mesh) toRemove.push(e);
      });
      toRemove.forEach(function (e) {
        scene.remove(e);
      });

      // add a large number of cubes
      if (controls.combined) {
        var geometry = new THREE.Geometry();
        for (let i = 0; i < controls.numberOfObjects; i++) {
          var cubeMesh = addcube();
          cubeMesh.updateMatrix();
          geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
        }
        scene.add(new THREE.Mesh(geometry, cubeMaterial));
      } else {
        for (let i = 0; i < controls.numberOfObjects; i++) {
          scene.add(controls.addCube());
        }
      }
    };

    this.addCube = addcube;

    this.outputObjects = function () {
      console.log(scene.children);
    };
  })();

  var gui = initLessonCateGUI();

  gui.add(controls, "numberOfObjects", 0, 20000);
  gui.add(controls, "combined").onChange(controls.redraw);
  gui.add(controls, "redraw");

  controls.redraw();

  render();

  var rotation = 0;

  function addcube() {
    var cubeSize = 1.0;
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube randomly in the scene
    cube.position.x = -60 + Math.round(Math.random() * 100);
    cube.position.y = Math.round(Math.random() * 10);
    cube.position.z = -150 + Math.round(Math.random() * 175);

    // add the cube to the scene
    return cube;
  }

  function render() {
    rotation += 0.005;

    stats.begin();

    camera.position.x = Math.sin(rotation) * 50;
    // camera.position.y = Math.sin(rotation) * 40;
    camera.position.z = Math.cos(rotation) * 50;
    camera.lookAt(scene.position);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    stats.end();
  }
}

function load_json_from_blender(elContainer) {
  var camera = initCamera(new THREE.Vector3(50, 50, 50));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  var loader = new THREE.JSONLoader();
  loader.load(
    "threejs/assets/models/house/house.json",
    function (geometry, mat) {
      var mesh = new THREE.Mesh(geometry, mat[0]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // call the default render loop.
      loaderScene.render(mesh, camera);
    }
  );
}

function load_obj(elContainer) {
  // setup the scene for rendering
  var camera = initCamera(new THREE.Vector3(50, 50, 50));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  var loader = new THREE.OBJLoader();
  loader.load("threejs/assets/models/pinecone/pinecone.obj", function (mesh) {
    var material = new THREE.MeshLambertMaterial({
      color: 0x5c3a21,
    });

    // loadedMesh is a group of meshes. For
    // each mesh set the material, and compute the information
    // three.js needs for rendering.
    mesh.children.forEach(function (child) {
      child.material = material;
      child.geometry.computeVertexNormals();
      child.geometry.computeFaceNormals();
    });

    mesh.scale.set(120, 120, 120);

    // call the default render loop.
    loaderScene.render(mesh, camera);
  });
}

function load_obj_mtl(elContainer) {
  var camera = initCamera(new THREE.Vector3(50, 50, 50));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath("threejs/assets/models/butterfly/");
  mtlLoader.load("butterfly.mtl", function (materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      "threejs/assets/models/butterfly/butterfly.obj",
      function (object) {
        // move wings to more horizontal position
        [0, 2, 4, 6].forEach(function (i) {
          object.children[i].rotation.z = 0.3 * Math.PI;
        });

        [1, 3, 5, 7].forEach(function (i) {
          object.children[i].rotation.z = -0.3 * Math.PI;
        });

        // configure the wings,
        var wing2 = object.children[5];
        var wing1 = object.children[4];

        wing1.material.opacity = 0.9;
        wing1.material.transparent = true;
        wing1.material.depthTest = false;
        wing1.material.side = THREE.DoubleSide;

        wing2.material.opacity = 0.9;
        wing2.material.depthTest = false;
        wing2.material.transparent = true;
        wing2.material.side = THREE.DoubleSide;

        object.scale.set(140, 140, 140);
        const mesh = object;

        object.rotation.x = 0.2;
        object.rotation.y = -1.3;

        loaderScene.render(mesh, camera);
      }
    );
  });
}

function load_collada(elContainer) {
  var camera = initCamera(new THREE.Vector3(35, 35, 35));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 45, 0));

  // load the model
  var loader = new THREE.ColladaLoader();
  loader.load(
    "threejs/assets/models/medieval/Medieval_building.DAE",
    function (result) {
      var sceneGroup = result.scene;
      sceneGroup.children.forEach(function (child) {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        } else {
          // remove any lighting sources from the model
          sceneGroup.remove(child);
        }
      });

      // correctly scale and position the model
      sceneGroup.rotation.z = 0.5 * Math.PI;
      sceneGroup.scale.set(8, 8, 8);

      // call the default render loop.
      loaderScene.render(sceneGroup, camera);
    }
  );
}

function load_stl(elContainer) {
  var camera = initCamera(new THREE.Vector3(50, 50, 50));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  // load the model: model from http://www.thingiverse.com/thing:69709
  var loader = new THREE.STLLoader();
  loader.load(
    "threejs/assets/models/head/SolidHead_2_lowPoly_42k.stl",
    function (geometry) {
      var mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.5,
      });
      var group = new THREE.Mesh(geometry, mat);
      group.rotation.x = -0.5 * Math.PI;
      group.scale.set(0.3, 0.3, 0.3);

      // call the default render loop.
      loaderScene.render(group, camera);
    }
  );
}

function load_vtk(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.VTKLoader();
  loader.load("threejs/assets/models/moai/moai_fixed.vtk", function (geometry) {
    var mat = new THREE.MeshNormalMaterial();

    geometry.center();
    geometry.computeVertexNormals();

    var group = new THREE.Mesh(geometry, mat);
    group.scale.set(25, 25, 25);

    loaderScene.render(group, camera);
  });
}

function load_pdb(elContainer) {
  var camera = initCamera(new THREE.Vector3(10, 10, 10));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.PDBLoader();

  // also possible to use diamond.pdb
  // loader.load("../../assets/models/molecules/aspirin.pdb", function (geometries) {
  loader.load(
    "threejs/assets/models/molecules/diamond.pdb",
    function (geometries) {
      var group = new THREE.Object3D();

      // create the atoms
      var geometryAtoms = geometries.geometryAtoms;

      for (let i = 0; i < geometryAtoms.attributes.position.count; i++) {
        let startPosition = new THREE.Vector3();
        startPosition.x = geometryAtoms.attributes.position.getX(i);
        startPosition.y = geometryAtoms.attributes.position.getY(i);
        startPosition.z = geometryAtoms.attributes.position.getZ(i);

        var color = new THREE.Color();
        color.r = geometryAtoms.attributes.color.getX(i);
        color.g = geometryAtoms.attributes.color.getY(i);
        color.b = geometryAtoms.attributes.color.getZ(i);

        let material = new THREE.MeshPhongMaterial({
          color: color,
        });

        let sphere = new THREE.SphereGeometry(0.2);
        let mesh = new THREE.Mesh(sphere, material);
        mesh.position.copy(startPosition);
        group.add(mesh);
      }

      // create the bindings
      var geometryBonds = geometries.geometryBonds;

      for (var j = 0; j < geometryBonds.attributes.position.count; j += 2) {
        let startPosition = new THREE.Vector3();
        startPosition.x = geometryBonds.attributes.position.getX(j);
        startPosition.y = geometryBonds.attributes.position.getY(j);
        startPosition.z = geometryBonds.attributes.position.getZ(j);

        var endPosition = new THREE.Vector3();
        endPosition.x = geometryBonds.attributes.position.getX(j + 1);
        endPosition.y = geometryBonds.attributes.position.getY(j + 1);
        endPosition.z = geometryBonds.attributes.position.getZ(j + 1);

        // use the start and end to create a curve, and use the curve to draw
        // a tube, which connects the atoms
        var path = new THREE.CatmullRomCurve3([startPosition, endPosition]);
        var tube = new THREE.TubeGeometry(path, 1, 0.04);
        let material = new THREE.MeshPhongMaterial({
          color: 0xcccccc,
        });
        let mesh = new THREE.Mesh(tube, material);
        group.add(mesh);
      }

      loaderScene.render(group, camera);
    }
  );
}

function load_PLY(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.PLYLoader();

  loader.load(
    "threejs/assets/models/carcloud/carcloud.ply",
    function (geometry) {
      var material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        opacity: 0.6,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        map: generateSprite(),
      });

      var group = new THREE.Points(geometry, material);
      group.scale.set(2.5, 2.5, 2.5);

      loaderScene.render(group, camera);
    }
  );

  // From Three.js examples
  function generateSprite() {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext("2d");

    // draw the sprites
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

    // create the texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}

function load_awd(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.AWDLoader();
  loader.load(
    "threejs/assets/models/polarbear/PolarBear.awd",
    function (model) {
      model.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshLambertMaterial({
            color: 0xaaaaaa,
          });
        }
      });

      model.scale.set(0.1, 0.1, 0.1);
      loaderScene.render(model, camera);
    }
  );
}

function load_assimp(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.AssimpJSONLoader();
  loader.load(
    "threejs/assets/models/spider/spider.obj.assimp.json",
    function (model) {
      model.scale.set(0.4, 0.4, 0.4);
      loaderScene.render(model, camera);
    }
  );
}

function load_vrml(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.VRMLLoader();
  loader.load("threejs/assets/models/tree/tree.wrl", function (model) {
    model.scale.set(10, 10, 10);
    loaderScene.render(model, camera);
  });
}

function load_babylon(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  var loaderScene = new BaseLoaderScene(elContainer, camera, false);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var loader = new THREE.BabylonLoader();
  new THREE.Object3D();
  loader.load(
    "threejs/assets/models/skull/skull.babylon",
    function (loadedScene) {
      // babylon loader contains a complete scene.
      console.log(
        (loadedScene.children[1].material = new THREE.MeshLambertMaterial())
      );
      loaderScene.render(loadedScene, camera);
    }
  );
}

function load_svg(elContainer) {
  var camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  var loaderScene = new BaseLoaderScene(elContainer, camera);

  var loader = new THREE.SVGLoader();

  // you can use slicer to convert the model
  loader.load("threejs/assets/models/tiger/tiger.svg", function (paths) {
    var group = new THREE.Group();
    group.scale.multiplyScalar(0.1);
    group.scale.y *= -1;
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var material = new THREE.MeshBasicMaterial({
        color: path.color,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      var shapes = path.toShapes(true);
      for (var j = 0; j < shapes.length; j++) {
        var shape = shapes[j];
        var geometry = new THREE.ShapeBufferGeometry(shape);
        var mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      }
    }

    console.log(group);
    loaderScene.render(group, camera);
  });
}

export {
  init_group,
  init_merging,
  load_json_from_blender,
  load_obj,
  load_obj_mtl,
  load_collada,
  load_stl,
  load_vtk,
  load_pdb,
  load_PLY,
  load_awd,
  load_assimp,
  load_vrml,
  load_babylon,
  load_svg,
};
