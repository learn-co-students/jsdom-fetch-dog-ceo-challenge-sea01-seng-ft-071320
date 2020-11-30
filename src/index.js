// console.log("%c HI", "color: firebrick");

const dogBreedList = document.querySelector("#dog-breeds");
const dogDropdown = document.getElementById("breed-dropdown");
const allDogs = dogBreedList.children;

// const b = dogBreedList;

breedUrl();
changeListColor();

const dogImage = () => {
  return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then((dogs) => dogs.message.forEach((dog) => appendDogImages(dog)));
};
function appendDogImages(dog) {
  let dogImageContainer = document.querySelector("#dog-image-container");
  dogImageContainer.innerHTML += `<img src=${dog} width="25%"/>`;
}
dogImage();

function breedUrl() {
  return fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((dogs) =>
      Object.keys(dogs.message).forEach((dog) => appendDogBreeds(dog))
    );
}

function dogSort() {
  dogDropdown.addEventListener("input", function (event) {
    const choice = event.target.value;
    const allDogs = dogBreedList.children;
    for (dog of allDogs) {
      dog.style.display = `block`;
    }
    for (dog of allDogs) {
      if (!dog.innerText.startsWith(choice)) {
        dog.style.display = `none`;
      }
    }
  });
}
function appendDogBreeds(dog) {
  dogBreedList.innerHTML += `<li data-action = "change color">${dog}</li>`;
}

function changeListColor() {
  dogBreedList.addEventListener("click", function (e) {
    if (e.target.dataset.action === "change color") {
      e.target.style.color = "red";
    }
  });
}
dogSort();
