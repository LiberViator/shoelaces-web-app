const tutorialTitle = document.querySelector(".tutorial__menu__info__title");
const tutorialSteps = document.querySelector(".tutorial__menu__info__steps");
const backButton = document.querySelector(".tutorial__nav__back");
const nextButton = document.querySelector(".tutorial__nav__next");
const animation = document.querySelector(".animation");

const id = location.search.substring(0).replace("?id=", "");

const url = "./models.json";

var step = 1;

async function fetchJSON() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchJSON().then(data => {
  for (let card = 0; card <= id; card++) {

    console.log('Walking east one step');

    tutorialTitle.innerHTML = data[id].name;
    tutorialSteps.innerHTML = step + " / " + data[id].steps.length;

    backButton.onclick = function() {
      if (step > 1) {
        step--;
        tutorialSteps.innerHTML = step + " / " + data[id].steps.length;
      } else {
        // Back to catalogue
        window.location.href = "./index.html";
      }
    };

    nextButton.onclick = function() {
      if (step < data[id].steps.length) {
        step++;
        tutorialSteps.innerHTML = step + " / " + data[id].steps.length;
      } else {
        // Play animation and back to catalogue
        animation.classList.add("running")
        setTimeout(function playAnimation() {
          window.location.href = "./index.html";
        }, 800);
      }
    };
  }
});
