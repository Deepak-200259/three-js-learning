import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Textures Load
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
const matCapTexture = textureLoader.load("/textures/matcaps/4.png");

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const environmentTexture = cubeTextureLoader.load([
//   "/textures/environmentMaps/4/px.png",
//   "/textures/environmentMaps/4/nx.png",
//   "/textures/environmentMaps/4/py.png",
//   "/textures/environmentMaps/4/ny.png",
//   "/textures/environmentMaps/4/pz.png",
//   "/textures/environmentMaps/4/nz.png",
// ]);
//  new THREE.Texture("/textures/environmentMaps/0/px.jpg")
// const environmentTexture = new THREE.Texture("/textures/environmentMaps/0/nx.jpg")
// const environmentTexture = new THREE.Texture("/textures/environmentMaps/0/py.jpg")
// const environmentTexture = new THREE.Texture("/textures/environmentMaps/0/ny.jpg")
// const environmentTexture = new THREE.Texture("/textures/environmentMaps/0/pz.jpg")
// const environmentTexture = new THREE.Texture("/textures/environmentMaps/0/nz.jpg")
/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
/**
 * Constant Objects
 */
const colorParameters = {
  color: "#ff0000",
};
/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color(0xff0000);
// material.map = doorColorTexture;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

/**
 * Mesh Normal Material
 */
// const material = new THREE.MeshNormalMaterial();

/**
 * Mesh Basic Material
 */
// const material = new THREE.MeshBasicMaterial();

/**
 * Mesh Matcap Material
 */
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCapTexture;

/**
 * Mesh Depth Material
 */
// const material = new THREE.MeshDepthMaterial();

/**
 * Mesh Lambert Material
 */
// const material = new THREE.MeshLambertMaterial();
// // Needs Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xf2001f, 1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Mesh Phong Material
 */
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x0000ff)
// // Needs Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Mesh Toon Material
 */
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// // Needs Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Mesh Standard Material
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
// material.envMap = environmentTexture;
// material.wireframe = true;
// material.transparent = true;
material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// // material.aoMapIntensity = 10;
material.alphaMap = doorAlphaTexture;
material.normalMap = doorNormalTexture;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.lightMap = doorHeightTexture;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
// Needs Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 10, 100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
// plane.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
// );
material.side = THREE.DoubleSide;
// material.flatShading = true;
sphere.position.x = -1.5;
torus.position.x = 1.5;

// scene.add(sphere);
scene.add(plane);
// scene.add(torus);
/**
 * Debug UI
 */
const gui = new dat.GUI();
console.log(gui);
// gui.add(sphere.material, "wireframe").name("WireFrame");
// gui.add(sphere.material, "visible").name("Visible");
// gui.add(sphere.position, "x").min(-1.5).max(1.5).step(0.01).name("Sphere Pos");
gui.add(plane.position, "x").min(-1.5).max(1.5).step(0.01).name("Plane Pos");
// gui.add(torus.position, "x").min(-1.5).max(1.5).step(0.01).name("Torus Pos");
// gui.add(plane.rotation, "y").min(-15).max(15).name("Plane Rotate");
// gui.add(torus.rotation, "y").min(-15).max(15).name("Torus Rotate");
// gui.add(material, "transparent").name("Transparent");
gui
  .add(material, "aoMapIntensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("AO Map Intensity");
gui.add(material, "metalness").min(0).max(1).step(0.0001).name("Metalness");
gui.add(material, "roughness").min(0).max(1).step(0.0001).name("Roughness");
gui
  .add(material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Displacement");
// gui.add(material, "shininess").min(0).max(1).step(0.0001).name("Shininess");
// gui.add(material, "flatShading").name("Flat Shading");
// gui.add(material, "opacity").min(0).max(1).name("Opacity");
gui.addColor(colorParameters, "color").onChange(() => {
  material.color.set(colorParameters.color);
});
/**
 * Event Listener
 */
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update Objects
  // sphere.rotation.y = 2 * elapsedTime;
  // plane.rotation.y = elapsedTime;
  // torus.rotation.y = 3 * elapsedTime;
  //   camera.rotation.y = elapsedTime;
  //   camera.updateProjectionMatrix();
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
