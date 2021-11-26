const catalogue = document.querySelector(".catalogue");

const url = "./models.json";

async function fetchJSON() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchJSON().then(data => {
  for (let card = 0; card < data.length; card++) {

    const newCard = document.createElement("a");
    newCard.classList.add("catalogue__card");
    newCard.style.backgroundImage = "url(\"" + data[card].background + "\")";
    catalogue.appendChild(newCard);

    newCard.onclick = function() {
      window.location.href = "./tutorial.html" + "?id=" + card;
    };

    const newCardLevel = document.createElement("div");
    newCardLevel.classList.add("catalogue__card__level");
    newCard.appendChild(newCardLevel);

    const newCardLevelIcon = document.createElement("img");
    newCardLevelIcon.classList.add("catalogue__card__level__icon");
    newCardLevelIcon.src = "img/" + data[card].level + ".svg";
    newCardLevel.appendChild(newCardLevelIcon);

    const newCardTitle = document.createElement("div");
    newCardTitle.classList.add("catalogue__card__title");
    newCard.appendChild(newCardTitle);

    const newCardTitleText = document.createElement("h3");
    newCardTitleText.classList.add("catalogue__card__title__text");
    newCardTitleText.textContent = data[card].name;
    newCardTitle.appendChild(newCardTitleText);
  }
});
