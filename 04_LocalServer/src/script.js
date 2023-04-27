import * as THREE from "three";
//Scene Created
const scene = new THREE.Scene();

//Red Cube
//1. Geometry Added
const geometry = new THREE.BoxGeometry(1, 1, 1);

//2. Material added
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

//3. Mesh Created
const mesh = new THREE.Mesh(geometry, material);

//Added In Scene
scene.add(mesh);

//Sizes
const sizes = {
  width: 800,
  height: 600,
};
const aspect_ratio = sizes.width / sizes.height;

//Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio);
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
