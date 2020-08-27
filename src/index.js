console.log('%c HI', 'color: firebrick')
let dogBreedList = document.getElementById('dog-breeds')

    const dogImage = () => {
        fetch("https://dog.ceo/api/breeds/image/random/4")
            .then((response) => response.json())
            // .then(data => console.log(data))
            .then(data => data.message.forEach(dog => appendDogImages(dog)))
    }

    

    const breedUrl = () => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then((response) => response.json())
            // .then(data => console.log(data))
            .then(data => Object.keys(data.message).forEach(dog => appendDogBreed(dog)))
    }

        
        dogImage()

        breedUrl()
    function appendDogImages(dog) {
        // console.log(dog)
        let dogImageContainer = document.getElementById('dog-image-container')
        dogImageContainer.innerHTML += `<img src=${dog} />`
    }

    function appendDogBreed(dog) {
        dogBreedList.innerHTML += `<li data-action = "change color"> ${dog} </li>`

    }

    function changeListColor() {
        dogBreedList.addEventListener("click", function(e) {
            if (e.target.dataset.action === "change color") {
                e.target.style.color = "red"
            }
        })
    }

    changeListColor()


