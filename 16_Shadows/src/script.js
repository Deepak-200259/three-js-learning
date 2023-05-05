import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

//Load Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");
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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const ambientLightFolder = gui.addFolder("Ambient Light Controls");
ambientLightFolder
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Intensity");
ambientLightFolder.add(ambientLight.position, "x").min(-5).max(5).step(0.001);
ambientLightFolder.add(ambientLight.position, "y").min(-5).max(5).step(0.001);
ambientLightFolder.add(ambientLight.position, "z").min(-5).max(5).step(0.001);
ambientLightFolder.close();
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
const directionalLightFolder = gui.addFolder("Directional Light Controls");
directionalLight.position.set(2, 2, -1);
directionalLightFolder
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Directional Light Intensity");
directionalLightFolder
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder.close();
directionalLight.castShadow = true;
// scene.add(directionalLight);

//Directional Light Camera Helper
// const directionalLightCamerahelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// directionalLightCamerahelper.visible = false;

// Directional Light Shadows
// directionalLight.shadow.mapSize = new THREE.Vector2(4096, 4096);
// // directionalLight.shadow.camera.top = 1;
// // directionalLight.shadow.camera.right = 1;
// // directionalLight.shadow.camera.bottom = -1;
// // directionalLight.shadow.camera.left = -1;
// directionalLight.shadow.camera.near = 1;
// directionalLight.shadow.camera.far = 20;
// directionalLight.shadow.radius = 5;
// scene.add(directionalLightCamerahelper);
// console.log(directionalLight.shadow);

//Spot Light
const spotLight = new THREE.SpotLight();
spotLight.color = new THREE.Color(0xffffff);
spotLight.intensity = 0.3;
spotLight.distance = 10;
spotLight.decay = Math.PI * 0.3;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);
const spotLightFolder = gui.addFolder("Spot Light Controls");
spotLightFolder
  .add(spotLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Intensity");
spotLightFolder.add(spotLight.position, "x").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "y").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "z").min(-5).max(5).step(0.001);
spotLightFolder.addColor = new THREE.Color(spotLight, "color");
spotLightFolder.close();
spotLight.castShadow = false;

//Spot Light Helper
// const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightHelper);
// spotLightHelper.visible = false;

//Spot Light Shadows
// // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// // spotLight.shadow.camera.fov = 30;
// // spotLight.shadow.camera.far = 6;
// // spotLight.shadow.camera.near = 1;
// // // spotLight.shadow.camera.left = 1;
// // // spotLight.shadow.camera.top = 1;
// // // spotLight.shadow.camera.bottom = -1;
// // // spotLight.shadow.camera.right = -1;
// console.log(spotLight.shadow);

//Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.3);
scene.add(pointLight);
pointLight.castShadow = false;
pointLight.position.set(0, 2, 2);

// //Point Light Camera Helper
// const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightHelper);
// pointLightHelper.visible = false;
// //Point Light Shadow
// console.log(pointLight.shadow);
// pointLight.shadow.camera.near = 0.5;
// pointLight.shadow.camera.far = 6;
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
const materialFolder = gui.addFolder("Material Controls");
material.roughness = 0.7;

materialFolder.add(material, "metalness").min(0).max(1).step(0.001);
materialFolder.add(material, "roughness").min(0).max(1).step(0.001);
materialFolder.close();
/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.7;
plane.receiveShadow = true;
scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.3),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
/**
 * Animate
 */
const randomValue = 1.5;
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update the Sphere
  sphere.position.x = Math.cos(elapsedTime) * randomValue;
  sphere.position.z = Math.sin(elapsedTime) * randomValue;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * randomValue * 2));

  //Update the Shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;

  sphereShadow.material.opacity = 1 - sphere.position.y;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
