import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

/**
 * Position
 */
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(1, 0, 1);

/**
 * Scale
 */
// mesh.scale.set(2, 0.5, 0.5);

/**
 * Rotation
 */
// mesh.rotation.reorder("YXZ");
// mesh.rotation.y = 1;
// mesh.rotation.x = 0.5;

/**
 * Quaternion
 */
// mesh.quaternion.set(1, 0.5, 0, 0);
// console.log(mesh.rotation.z);
// scene.add(mesh);

// console.log(mesh.position.length());

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 0.5;
// camera.lookAt(mesh.position);

scene.add(camera);

// mesh.distance.normalize();

/**
 * Groups
 */
const group = new THREE.Group();
scene.add(group);

/**
 * Group Objects
 */
const Cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const Cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const Cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
Cube1.position.x = -1;
Cube2.position.x = 1;
Cube3.position.x = 3;
group.add(Cube1);
group.add(Cube2);
group.add(Cube3);

group.position.y = 2;
group.position.x = group.position.x - 0.5;

group.scale.x = 1.2;
group.rotation.y = 1;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
