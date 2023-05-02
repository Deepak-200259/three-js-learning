import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

/**
 * Debug
 */
const gui = new dat.GUI();
console.log(gui);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//Objects
const colorParameters = {
  color: "#ffff00",
  spin: () => {
    console.log("Spin");
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: colorParameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Debug
 */

//Variable Values
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("X-Elevation");
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y-Elevation");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("Z-Elevation");
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);
gui.add(mesh.scale, "x").min(-2).max(2).step(1);
gui.add(mesh.scale, "y").min(-2).max(2).step(1);
gui.add(mesh.scale, "z").min(-2).max(2).step(1);
//Boolean
gui.add(mesh, "visible");
gui.add(material, "wireframe");

//Colors
gui.addColor(colorParameters, "color").onChange(() => {
  material.color.set(colorParameters.color);
});

gui.add(colorParameters, "spin");

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
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
