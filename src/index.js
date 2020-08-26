fetchDogImages();
fetchDogBreeds();
initDogBreedSelect();

function fetchDogImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

  fetch(imgUrl)
    .then((resp) => resp.json())
    .then((json) => renderDogImages(json.message));
}

function renderDogImages(images) {
  const imageContainerNode = document.getElementById("dog-image-container");

  for (const imageUrl of images) {
    const dogImage = document.createElement("img");

    dogImage.src = imageUrl;

    imageContainerNode.appendChild(dogImage);
  }
}

function fetchDogBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((json) => resolveFetchDogBreeds(json.message));
}

function resolveFetchDogBreeds(breeds) {
  renderDogBreeds(breeds);
  initDogBreedClick();
}

function renderDogBreeds(breeds) {
  const breedListNode = document.getElementById("dog-breeds");

  for (const breed in breeds) {
    const breedListItemNode = document.createElement("li");
    breedListItemNode.innerHTML = `<p>${breed}</p>`;
    breedListItemNode.classList.add("dog-breed");

    if (isArray(breeds[breed])) {
      const subBreedListNode = renderDogSubBreeds(breeds[breed]);

      breedListItemNode.appendChild(subBreedListNode);
    }

    breedListNode.appendChild(breedListItemNode);
  }
}

function renderDogSubBreeds(subBreeds) {
  const subBreedListNode = document.createElement("ul");

  for (const subBreed of subBreeds) {
    const subBreedListItemNode = document.createElement("li");
    subBreedListItemNode.textContent = subBreed;
    subBreedListNode.appendChild(subBreedListItemNode);
  }

  return subBreedListNode;
}

function dogBreedSelect(e) {
  const letter = e.target.value;

  filterDogBreeds(letter);
}

function filterDogBreeds(letter) {
  const breedList = document.getElementById("dog-breeds");
  const newBreedList = breedList.cloneNode(false);

  filterList = Array.from(breedList.childNodes);

  for (const breedListItemNode of filterList) {
    if (breedListItemNode.textContent[0] != letter) {
      breedListItemNode.classList.add("filtered");
    } else {
      breedListItemNode.classList.remove("filtered");
    }

    newBreedList.appendChild(breedListItemNode);
  }

  breedList.parentNode.replaceChild(newBreedList, breedList);
}

function changeColor(e) {
  e.target.classList.add("clr-steelblue");
}

function initDogBreedSelect() {
  const dogBreedSelectNode = document.getElementById("breed-dropdown");

  dogBreedSelectNode.addEventListener("change", dogBreedSelect);
}

function initDogBreedClick() {
  const dogBreedListItems = document.querySelectorAll(".dog-breed > p");

  for (let i = 0; i < dogBreedListItems.length; i++) {
    dogBreedListItems[i].addEventListener("click", changeColor);
  }
}

// Helper function to determine if something is an array
function isArray(array) {
  return !(!Array.isArray(array) || !array.length);
}
