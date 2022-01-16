//Creates a IIFE protected repository for POKEMON for the PokeDex project//
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';
function add(pokemon) {
  pokemonList.push(pokemon);
}
function getAll() {
  return pokemonList;
}

function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');
  //clear all existing modal content
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  //add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);

  let pokeName = document.createElement('h1');
  pokeName.classList.add('modal-details');
  pokeName.innerText = pokemon.name;

  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-modal-image');
  pokemonImage.src = pokemon.imageUrl;

  /* TO DO:
  let pokeType = document.createElement('p');
  pokeType.innerText = ('Type = ' + pokemon.types);
  pokeType.classList.add('modal-details');
  */

  let pokeHeight = document.createElement('p');
  pokeHeight.innerText = ('Height = ' + pokemon.height);
  pokeHeight.classList.add('modal-details');

  let pokeWeight = document.createElement('p');
  pokeWeight.innerText = ('Weight = ' + pokemon.weight);
  pokeWeight.classList.add('modal-details');

  modalContainer.appendChild(modal);
  modal.appendChild(closeButtonElement);
  modal.appendChild(pokeName);
  modal.appendChild(pokemonImage);
  // TO DO-- modal.appendChild(pokeType);
  modal.appendChild(pokeWeight);
  modal.appendChild(pokeHeight);

  modalContainer.classList.add('is-visible');

}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

let modalContainer = document.querySelector('#modal-container');
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

/*Function to create add <li> elements with pokemon names from the pokemonList array
and adds buttons to the <li> with the names.*/
function addListItem(pokemon) {
  let listCreator = document.querySelector('.pokemon-list');
  let listItemCreator = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add('button-style');
  listCreator.appendChild(listItemCreator);
  listItemCreator.appendChild(button);
  button.addEventListener('click', function showDetails() {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    });
  }

//Fetch the list of pokemon from the API
function loadList() {
  return fetch(apiUrl).then(function (response) {
      return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  });
}

//Fetches details from the API
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    //Add the details to the item
    item.imageUrl = details.sprites.front_default;
    // TO DO--  item.types = details.types.type.name;
    item.height = details.height;
    item.weight = details.weight;
  }).catch(function (e) {
    console.error(e);
  });
}

return {
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails,
  addListItem: addListItem,
  showModal: showModal,
  hideModal: hideModal
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
