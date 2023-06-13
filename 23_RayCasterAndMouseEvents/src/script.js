import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#2f14ff" })
);
object1.position.x = -2;
object1.position.y = 2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ffff00" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#00ffff" })
);
object3.position.x = 2;
object3.position.y = 2;

scene.add(object1, object2, object3);
const objects = [object1, object2, object3];
/**
 * On Mouse Click
 */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
  //   createRay(mouse.x, mouse.y);
});
window.addEventListener("click", () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log("click on object 1");
        break;

      case object2:
        console.log("click on object 2");
        break;

      case object3:
        console.log("click on object 3");
        break;
    }
  }
});
// window.addEventListener("mouseenter", (event) => {
//   console.log("mouse Enter");
// });
// window.addEventListener("mouseleave", (event) => {
//   console.log("mouse leave");
// });
/**
 * RayCaster
 */
// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayEnd = new THREE.Vector3(9, 0, 0);
// // console.log(rayEnd.length());
// rayEnd.normalize();
// const rayCaster = new THREE.Raycaster(rayOrigin, rayEnd);
// console.log(rayCaster);
// const intersectCheck = rayCaster.intersectObject(object1);
// console.log(intersectCheck);

// const rayCaster = new THREE.Raycaster();
// rayCaster.set(rayOrigin, rayEnd);
// const intersectsCheck = rayCaster.intersectObjects([object1, object2, object3]);
// console.log(intersectsCheck);
const rayEnd = new THREE.Vector3(0, 0, 10);
const rayCaster = new THREE.Raycaster();
const createRay = (x, y) => {
  rayCaster.set(new THREE.Vector3(x, y, 0), rayEnd);
  const intersect = rayCaster.intersectObjects(objects);
  console.log(intersect);
};

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.3);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * gltf Loader
 */
const gltfLoader = new GLTFLoader();
console.log(gltfLoader);
const duck = gltfLoader.load(
  "/models/Duck/glTF/Duck.gltf",
  (gltf) => {
    console.log("model Loaded", gltf.scene);
    scene.add(gltf.scene);
    gltf.scene.position.y = -1.2;
  },
  (gltf) => {
    console.log("model Loading", gltf);
  },
  (gltf) => {
    console.log("model not loaded");
  }
);

/**
 * Animate
 */
const clock = new THREE.Clock();
let currentIntersect = null;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Animate Objects
  object1.position.y = Math.sin(elapsedTime * 1) * 2;
  //     object1.position.x = Math.cos(elapsedTime * 2) * 2;
  object2.position.y = Math.sin(elapsedTime * 3);
  //     object2.position.z = Math.cos(elapsedTime * 3);
  object3.position.y = Math.cos(elapsedTime * 3) * 1.5;
  //   object3.position.y = Math.sin(elapsedTime * 1.5);

  rayCaster.setFromCamera(mouse, camera);

  //Cast a ray
  //   const rayOrigin = new THREE.Vector3(-3, 0, 0);
  //   const rayDirection = new THREE.Vector3(10, 0, 0);
  //   rayDirection.normalize();
  //   rayCaster.set(rayOrigin, rayDirection);
  const shoot = rayCaster.intersectObjects(objects);
  for (const obj of objects) {
    obj.material.color.set(0xff0000);
  }
  for (const obj of shoot) {
    obj.object.material.color.set(0x00ff00);
  }

  if (shoot.length) {
    if (!currentIntersect) {
      console.log("mouse enter");
    }

    currentIntersect = shoot[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }

    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
