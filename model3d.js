// var clip

// Canvas
const canvas = document.querySelector(".tutorial__canvas");

// Scene
const scene = new THREE.Scene();

scene.position.x = 0;
scene.position.y = 0;
scene.position.z = 0;

scene.rotation.x = 0;
scene.rotation.y = -0.3;
scene.rotation.z = 0;

// Importing 3D model
const loader = new THREE.GLTFLoader();

loader.load("./converseShoe.glb", (gltf) => {
  gltf.scene.scale.set(1, 1, 1);
  // clip = gltf.animations[0];
  scene.add(gltf.scene);

  const model = gltf.scene;

  model.position.x = 0;
  model.position.y = 0;
  model.position.z = 0;

  model.rotation.x = 0;
  model.rotation.y = 0;
  model.rotation.z = 0;
})

// function nextFrame(){
//   model.position.x = 20;
//   clip.animations[0];
// };
//
// function prevFrame(){
//
// };

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio / 1.4);
renderer.setClearColor(0xFFFFFF);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);

camera.position.x = 0;
camera.position.y = 6;
camera.position.z = 5;

camera.rotation.x = -0.8;
camera.rotation.y = 0;
camera.rotation.z = 0;

// Light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 0, 25);
scene.add(light);

// Update sizes
window.onresize = function() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio / 1.4);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
};

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
