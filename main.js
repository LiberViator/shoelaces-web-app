const appHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()


const catalogue = document.querySelector(".catalogue");

const url = "./models.json";

async function fetchJSON() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchJSON().then(data => {
  for (let card = 0; card < data.length; card++) {

    console.log('Walking east one step');

    const newCard = document.createElement("a");
    newCard.classList.add("catalogue__card");
    newCard.style.backgroundImage = "url(\"" + data[card].background + "\")";
    catalogue.appendChild(newCard);

    newCard.onclick = function() {
      window.location.href = "./tutorial.html" + "?id=" + card;
    };

    const newCardRating = document.createElement("div");
    newCardRating.classList.add("catalogue__card__rating");
    newCard.appendChild(newCardRating);

    const newCardRatingIcon = document.createElement("img");
    newCardRatingIcon.classList.add("catalogue__card__rating__icon");
    newCardRatingIcon.src = "img/heart.svg";
    newCardRating.appendChild(newCardRatingIcon);


    const newCardTitle = document.createElement("div");
    newCardTitle.classList.add("catalogue__card__title");
    newCard.appendChild(newCardTitle);

    const newCardTitleText = document.createElement("h3");
    newCardTitleText.classList.add("catalogue__card__title__text");
    newCardTitleText.textContent = data[card].name;
    newCardTitle.appendChild(newCardTitleText);
  }
});
