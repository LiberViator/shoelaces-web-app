const tutorialLevelIcon = document.querySelector(".tutorial__menu__level__icon");
const tutorialTitle = document.querySelector(".tutorial__menu__info__title");
const tutorialSteps = document.querySelector(".tutorial__menu__info__steps");
const backButton = document.querySelector(".tutorial__nav__back");
const nextButton = document.querySelector(".tutorial__nav__next");
const nextButtonText = document.querySelector(".tutorial__nav__next__text");
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
  document.title = data[id].name;
  tutorialLevelIcon.src = "img/" + data[id].level + ".svg";
  tutorialTitle.innerHTML = data[id].name;
  tutorialSteps.innerHTML = step + " / " + data[id].steps.length;

  backButton.onclick = function() {
    if (step > 1) {
      step--;
      tutorialSteps.innerHTML = step + " / " + data[id].steps.length;
      nextButtonText.innerHTML = "Next step";
    } else {
      // Back to catalogue
      animation.style.willChange = "auto";
      window.location.href = "./index.html";
    }
  };

  nextButton.onclick = function() {
    if (step < data[id].steps.length) {
      step++;
      tutorialSteps.innerHTML = step + " / " + data[id].steps.length;
    } else {
      animation.classList.add("running")
      setTimeout(function playAnimation() {
        window.location.href = "./index.html";
      }, 800);
    }
    if (step === data[id].steps.length) {
      nextButtonText.innerHTML = "Finish";
      animation.style.willChange = "opacity";
    }
  };
});
