import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import * as Physics from "cannon-es";
import CannonDebugger from "cannon-es-debugger";

/**
 * Debug Panel
 */
const gui = new dat.GUI();
const debugObject = {};
debugObject.createSphere = () => {
  createSphere(Math.random(), {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};
debugObject.createBox = () => {
  console.log("Created Box");
  createBox(Math.random(), Math.random(), Math.random(), {
    x: (Math.random() - 0.5) * 3,
    y: 3,
    z: (Math.random() - 0.5) * 3,
  });
};
debugObject.reset = () => {
  for (const object of objectToUpdate) {
    object.body.removeEventListener("collide", playHitSound);
    // objectToUpdate.splice(0, objectToUpdate.length);
    world.removeBody(object.body);
    scene.remove(object.mesh);
  }
};
gui.add(debugObject, "createSphere").name("Create new Sphere");
gui.add(debugObject, "createBox").name("Create new Box");
gui.add(debugObject, "reset").name("Reset Everything");
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sounds
 */
const hitSound = new Audio("/sounds/hit.mp3");

const playHitSound = (collision) => {
  const impact = collision.contact.getImpactVelocityAlongNormal();
  if (impact > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
};
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

/**
 * Physics World
 */
const world = new Physics.World();
world.gravity.set(0, -9.82, 0);
world.allowSleep = true;
// Materials
const defaultMaterial = new Physics.Material("Default");
const defaultContactMaterial = new Physics.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);
world.addContactMaterial(defaultContactMaterial);

/**
 * Utils
 */
//Create Sphere
const objectToUpdate = [];
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 0.4,
  envMap: environmentMapTexture,
});

const createSphere = (radius, position) => {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.scale.set(radius, radius, radius);
  sphere.castShadow = true;
  sphere.position.copy(position);
  scene.add(sphere);

  //Cannon JS body
  const shape = new Physics.Sphere(radius);
  const body = new Physics.Body({
    shape: shape,
    mass: Math.random(),
    position: position,
    material: defaultMaterial,
  });
  body.addEventListener("collide", (collide) => {
    playHitSound(collide);
  });
  world.addBody(body);
  //Save in Object to Update
  objectToUpdate.push({ mesh: sphere, body: body });
};
//Create Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);
const boxMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 0.4,
  envMap: environmentMapTexture,
});
const createBox = (length, width, height, position) => {
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.scale.set(length, width, height);
  boxMesh.castShadow = true;
  scene.add(boxMesh);

  //Physics World Object
  const boxShape = new Physics.Box(
    new Physics.Vec3(length / 2, width / 2, height / 2)
  );
  const physicsBox = new Physics.Body({
    mass: 1,
    shape: boxShape,
    position: position,
    material: defaultContactMaterial,
  });
  physicsBox.addEventListener("collide", (collide) => {
    playHitSound(collide);
  });
  world.addBody(physicsBox);
  objectToUpdate.push({ mesh: boxMesh, body: physicsBox });
};

/**
 * Physics World Base
 */
const plane = new Physics.Plane();
const planeBody = new Physics.Body({
  mass: 0, //Static BODY, Won't Move
  //   position: new Physics.Vec3(0, 0, 0),
});
planeBody.addShape(plane);
planeBody.material = defaultMaterial;
planeBody.quaternion.setFromAxisAngle(
  new Physics.Vec3(-1, 0, 0),
  Math.PI * 0.5
);
world.addBody(planeBody);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
const cannonDebugger = new CannonDebugger(scene, world);
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  //Update Physics World
  world.step(1 / 60, deltaTime, 3);

  //Update Object
  //   sphere.position.copy(sphereBody.position);
  //   cube.position.copy(physicsCube.position);
  //   floor.position.copy(planeBody.position);
  //   sphere.position.x = sphereBody.position.x;
  //   sphere.position.y = sphereBody.position.y;
  //   sphere.position.z = sphereBody.position.z;

  for (const object of objectToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }
  //Update Debugger
  cannonDebugger.update();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
