import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";

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
//Ambient Light
const ambientLight = new THREE.AmbientLight(0x045adf, 0.5);
// scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.z = 2;
directionalLight.position.y = 2;
// scene.add(directionalLight);

//Hemishphere Light
const hemisphereLight = new THREE.HemisphereLight();
hemisphereLight.color = new THREE.Color(0xff0000);
hemisphereLight.groundColor = new THREE.Color(0x10eff0);
hemisphereLight.intensity = 0.5;
scene.add(hemisphereLight);

//Point Light
const pointLight = new THREE.PointLight(0xf0204f, 0.5);
pointLight.position.x = -1;
pointLight.position.y = 0;
pointLight.position.z = 1.5;
// scene.add(pointLight);

//Rect Area Light
const rectAreaLight = new THREE.RectAreaLight();
rectAreaLight.color = new THREE.Color(0x001034);
rectAreaLight.intensity = 1;
rectAreaLight.width = 5;
rectAreaLight.height = 3;
rectAreaLight.position.z = 2;
rectAreaLight.position.y = 2.5;
// scene.add(rectAreaLight);

//Spot Light
const spotLight = new THREE.SpotLight();
spotLight.color = new THREE.Color(0xff00a1);
spotLight.intensity = 3;
spotLight.distance = 10;
spotLight.angle = 90;
spotLight.penumbra = 4;
spotLight.position.z = 3;
spotLight.position.y = 3;
// scene.add(spotLight);

/**
 * Light Helpers
 */
//Hemisphere Light Helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
	hemisphereLight,
	0.1,
);
scene.add(hemisphereLightHelper);

//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	0.1,
);
scene.add(directionalLightHelper);

//Point Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

//Ambient Light Helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 32, 64),
	material,
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Debug UI
 */
//Folders
// const LightsFolder = gui.addFolder("Lights");
// LightsFolder.add(ambientLightFolder);
const ambientLightFolder = gui.addFolder("Ambient Light Controls");
const directionalLightFolder = gui.addFolder("Directional Light Controls");
const hemisphereLightFolder = gui.addFolder("Hemisphere Light Controls");
const pointLightFolder = gui.addFolder("Point Light Controls");
const rectAreaLightFolder = gui.addFolder("Rect Area Light Controls");
const spotLightFolder = gui.addFolder("Spot Light Controls");
//Ambient Light Controls
ambientLightFolder
	.add(ambientLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Ambient Light");
ambientLightFolder.addColor(ambientLight, "color");
ambientLightFolder.close();
//Point Light Controls
pointLightFolder
	.add(pointLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Point Light Intensity");
pointLightFolder
	.add(pointLight, "distance")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Point Light Distance");
pointLightFolder.add(pointLight, "decay").min(0).max(20).step(1).name("Decay");
pointLightFolder.close();
//Directional Light Controls
directionalLightFolder
	.add(directionalLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Directional Light Intensity");
directionalLightFolder.addColor(directionalLight, "color");
directionalLightFolder.close();
//Hemisphere Light Controls
hemisphereLightFolder
	.add(hemisphereLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Hemisphere Light Intensity");
hemisphereLightFolder.addColor(hemisphereLight, "color").name("Sky Color");
hemisphereLightFolder
	.addColor(hemisphereLight, "groundColor")
	.name("Ground Color");
hemisphereLightFolder.close();

//Rect Area Light Controls
rectAreaLightFolder.addColor(rectAreaLight, "color");
rectAreaLightFolder
	.add(rectAreaLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Rect Area Light Intensity");
rectAreaLightFolder
	.add(rectAreaLight, "width")
	.min(1)
	.max(10)
	.step(0.1)
	.name("Rect Area Width");
rectAreaLightFolder
	.add(rectAreaLight, "height")
	.min(1)
	.max(10)
	.step(0.1)
	.name("Rect Area height");
rectAreaLightFolder.close();

//Spot Light Controls
spotLightFolder.addColor(spotLight, "color");
spotLightFolder
	.add(spotLight, "intensity")
	.min(0)
	.max(1)
	.step(0.001)
	.name("Spot Light Intesity");
spotLightFolder
	.add(spotLight, "distance")
	.min(Math.PI * 0.1)
	.max(Math.PI)
	.step(0.001)
	.name("Spot Light Distance");
spotLightFolder
	.add(spotLight, "penumbra")
	.min(0)
	.max(10)
	.step(0.01)
	.name("Spot Light Penumbra");
spotLightFolder
	.add(spotLight, "angle")
	.min(0)
	.max(1)
	.step(0.1)
	.name("Spot Light Angle");
spotLightFolder.close();

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100,
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 2;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const update = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime;
	cube.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	cube.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;

	//SpotLight Helper Update
	spotLightHelper.update();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(update);
};

update();
