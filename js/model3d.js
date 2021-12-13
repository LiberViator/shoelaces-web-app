const tutorialLevelIcon = document.querySelector(".tutorial__menu__level__icon");
const tutorialTitle = document.querySelector(".tutorial__menu__info__title");
const tutorialSteps = document.querySelector(".tutorial__menu__info__steps");
const prevStepButton = document.querySelector(".tutorial__nav__back");
const prevStepButtonIcon = document.querySelector(".tutorial__nav__back__icon");
const nextStepButton = document.querySelector(".tutorial__nav__next");
const nextStepButtonIcon = document.querySelector(".tutorial__nav__next__icon");
const nextStepButtonText = document.querySelector(".tutorial__nav__next__text");
const loadingAnimation = document.querySelector(".loading-animation");
const finishAnimation = document.querySelector(".finish-animation");

const id = location.search.substring(0)
  .replace("?id=", "");
const url = "./models.json";
var currentFrame = 0;

var canvas, scene, camera, light, clock, renderer, controls, shoeMesh, shoelacesMesh, mixer, jsonData, leftShoelaceMesh, rightShoelaceMesh;

// Load manager
const manager = new THREE.LoadingManager();

// Canvas
canvas = document.querySelector(".tutorial__canvas");

// Scene
scene = new THREE.Scene();

scene.position.set(0, 0, 0);
scene.rotation.set(0, -0.3, 0);

// Camera
camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);

camera.position.set(-0.2, 6, 5);
camera.rotation.set(-0.8, 0, 0);

// Light
light = new THREE.PointLight(0xffffff, 1);

light.position.set(10, 0, 25);
light.rotation.set(0, 0, 0);
scene.add(light);

// Clock
clock = new THREE.Clock();

// Renderer
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio / 1.4);
renderer.setClearColor(0xFFFFFF);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Constrols
// controls = new THREE.OrbitControls(camera, renderer.domElement);

// Fetching JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    jsonData = data;

    function setUpPage() {
      if (shoeMesh == undefined) {
        setTimeout(setUpPage, 50);
        return;
      }
      document.title = jsonData[id].name;
      tutorialLevelIcon.src = "img/" + jsonData[id].level + ".svg";
      tutorialTitle.innerHTML = jsonData[id].name;
      tutorialSteps.innerHTML = shoeMesh.animations.length + " Steps";
    }
    setUpPage();

  });

// Importing 3D model mesh
const loadShoe = new THREE.GLTFLoader(manager);

loadShoe.load("./converseShoe.gltf", (gltf) => {
  scene.add(gltf.scene);

  shoeMesh = gltf;

  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.set(0, 0, 0);
});

const loadShoelaces = new THREE.GLTFLoader(manager);

loadShoelaces.load("./converseShoe.gltf", (gltf) => {
  // scene.add(gltf.scene);

  shoelacesMesh = gltf;

  // Animation mixer
  mixer = new THREE.AnimationMixer(shoelacesMesh.scene);

  mixer.clipAction(shoelacesMesh.animations[0]).play();

  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.rotation.set(0, 0, 0);
});

// Next step button
function nextAnim() {
  if (shoeMesh == undefined) return;
  if (currentFrame < shoeMesh.animations.length) {
    currentFrame++;
    nextStepButtonIcon.style.visibility = "visible";
    nextStepButtonText.innerHTML = "Next step";
    tutorialSteps.innerHTML = currentFrame + " / " + shoeMesh.animations.length + " Steps";
  } else if (currentFrame == shoeMesh.animations.length){
    finishAnimation.classList.add("running")
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 800);
  };
  if (currentFrame == shoeMesh.animations.length) {
    nextStepButtonIcon.style.visibility = "hidden";
    nextStepButtonText.innerHTML = "Finish";
    finishAnimation.style.willChange = "opacity";
  };
  if (currentFrame > 1) {
    prevStepButtonIcon.src = "./img/back.svg";
  }
};

// Previous step button
function prevAnim() {
  if (shoeMesh == undefined) return;
  if (currentFrame > 1) {
    currentFrame--;
    nextStepButtonIcon.style.visibility = "visible";
    tutorialSteps.innerHTML = currentFrame + " / " + shoeMesh.animations.length + " Steps";
    mixer.clipAction(shoeMesh.animations[currentFrame]).play();
    nextStepButtonText.innerHTML = "Next step";
  } else {
    finishAnimation.style.willChange = "auto";
    window.location.href = "./index.html";
  }
  if (currentFrame == 1) {
    prevStepButtonIcon.src = "./img/cancel.svg";
  }
};

// Optimazing animations
function render() {
  if (shoeMesh == undefined) {
    setTimeout(render, 50);
    return;
  }
  renderer.render(scene, camera);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  requestAnimationFrame(render);
};
render();

// Loading screen
manager.onLoad = (() => {
  loadingAnimation.style.display = "none";
});

// Update sizes
function updateSizes() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio / 1.4);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
};

[
  // const coordinates = [{
  //   "lb1": [0, 0, 0]
  // }, {
  //   "lt1": [0, 0, 0.2]
  // }, {
  //   "lb2": [0.4, 0, 0]
  // }, {
  //   "lt2": [0.4, 0, 0.2]
  // }, {
  //   "lb3": [0.8, 0, 0]
  // }, {
  //   "lt3": [0.8, 0, 0.2]
  // }, {
  //   "lb4": [1.2, 0, 0]
  // }, {
  //   "lt4": [1.2, 0, 0.2]
  // }, {
  //   "lb5": [1.6, 0, 0]
  // }, {
  //   "lt5": [1.6, 0, 0.2]
  // }, {
  //   "lb6": [2, 0, 0]
  // }, {
  //   "lt6": [2, 0, 0.2]
  // }, {
  //   "lb7": [2.4, 0, 0]
  // }, {
  //   "lt7": [2.4, 0, 0.2]
  // }, {
  //   "lb8": [2.8, 0, 0]
  // }, {
  //   "lt8": [2.8, 0, 0.2]
  // }, {
  //   "rb1": [0, 1, 0]
  // }, {
  //   "rt1": [0, 1, 0.2]
  // }, {
  //   "rb2": [0.4, 1, 0]
  // }, {
  //   "rt2": [0.4, 1, 0.2]
  // }, {
  //   "rb3": [0.8, 1, 0]
  // }, {
  //   "rt3": [0.8, 1, 0.2]
  // }, {
  //   "rb4": [1.2, 1, 0]
  // }, {
  //   "rt4": [1.2, 1, 0.2]
  // }, {
  //   "rb5": [1.6, 1, 0]
  // }, {
  //   "rt5": [1.6, 1, 0.2]
  // }, {
  //   "rb6": [2, 1, 0]
  // }, {
  //   "rt6": [2, 1, 0.2]
  // }, {
  //   "rb7": [2.4, 1, 0]
  // }, {
  //   "rt7": [2.4, 1, 0.2]
  // }, {
  //   "rb8": [2.8, 1, 0]
  // }, {
  //   "rt8": [2.8, 1, 0.2]
  // }];
  //
  // var leftPath = [];
  // var rightPath = [];
  //
  // // Getting coordinates from JSON file
  // function fetchCoord() {
  //   if (jsonData == undefined) {
  //     setTimeout(fetchCoord, 50);
  //     return;
  //   }
  //   leftPath.push(new THREE.Vector3(0, 0.5, 0));
  //   rightPath.push(new THREE.Vector3(0, 0.5, 0));
  //   for (let i = 0; i < jsonData[id].leftShoelaceCoord.length; i++) {
  //     var coord;
  //     coordinates.find(item => coord = item[jsonData[id].leftShoelaceCoord[i]]);
  //     leftPath.push(new THREE.Vector3(coord[0], coord[1], coord[2]));
  //   }
  //   for (let i = 0; i < jsonData[id].rightShoelaceCoord.length; i++) {
  //     var coord;
  //     coordinates.find(item => coord = item[jsonData[id].rightShoelaceCoord[i]]);
  //     rightPath.push(new THREE.Vector3(coord[0], coord[1], coord[2]));
  //   }
  //   console.log(leftPath);
  // }
  // fetchCoord();
  //
  // // Creating shoelaces from coordinates
  // function createShoelaces() {
  //   if (leftPath.length < 2 && rightPath.length < 2) {
  //     setTimeout(createShoelaces, 50);
  //     return;
  //   }
  //   var leftPathCurve = new THREE.CatmullRomCurve3(leftPath, false, "centripetal", 0.5);
  //   var rightPathCurve = new THREE.CatmullRomCurve3(rightPath, false, "centripetal", 0.5);
  //
  //   const leftCurvePoints = leftPathCurve.getPoints(60); //How many points on the path
  //   const rightCurvePoints = rightPathCurve.getPoints(60); //How many points on the path
  //
  //   const leftShoelaceGeometry = new THREE.BufferGeometry().setFromPoints(leftCurvePoints);
  //   const rightShoelaceGeometry = new THREE.BufferGeometry().setFromPoints(rightCurvePoints);
  //
  //   const material = new THREE.LineBasicMaterial({
  //     color: 0x772277
  //   });
  //
  //   leftShoelaceMesh = new THREE.Line(leftShoelaceGeometry, material);
  //   rightShoelaceMesh = new THREE.Line(rightShoelaceGeometry, material);
  //
  //   scene.add(leftShoelaceMesh, rightShoelaceMesh);
  //
  //   var drawRange = 60;
  //
  //   leftShoelaceGeometry.setDrawRange(0, 60);
  //
  //
  //   var pointsEndGeom = new THREE.SphereGeometry(0.04, 20, 20);
  //
  //   var shapeEnd = new THREE.Mesh(pointsEndGeom, new THREE.MeshBasicMaterial({color: "red"}));
  //   scene.add(shapeEnd);
  //
  //   var point = leftPathCurve.getPoint(1);
  //
  //   shapeEnd.position.x = point.x;
  //   shapeEnd.position.y = point.y;
  //   shapeEnd.position.z = point.z;
  // }
  // createShoelaces();
]

// Animations
function playAnim() {
  if (shoeMesh == undefined) {
    setTimeout(playAnim, 50);
    return;
  };
  // shoeMesh.animations.forEach((clip) => {
  //   mixer.clipAction(clip).play();
  // });
  var zoom = .6;
  for (zoom; zoom < 1; zoom += .1) {
    // scene.scale.set(zoom, zoom, zoom);
  }
  requestAnimationFrame(playAnim);
};
playAnim();


// Event listeners
nextStepButton.addEventListener("click", nextAnim);
prevStepButton.addEventListener("click", prevAnim);
document.addEventListener("keydown", () => {
  if (event.keyCode == 39) {
    nextAnim();
  } else if (event.keyCode == 37) {
    prevAnim();
  }
});
window.addEventListener("resize", updateSizes);
