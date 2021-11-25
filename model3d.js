// Canvas
const canvas = document.querySelector(".tutorial__canvas");

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xFFFFFF);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// import {GLTFLoader} from

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);
camera.position.z = 3;

// Light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 0, 25);
scene.add(light);

//Sizes
window.onresize = function() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
};

//Creating mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({
  color: 0x5E548E
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Animate mesh
function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  requestAnimationFrame(animate);
}
animate();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
