//Creates a IIFE protected repository for POKEMON for the PokeDex project//
let pokemonRepository = (function () {
let pokemonList = [];
let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
function add(pokemon) {
  pokemonList.push(pokemon);
}
function getAll() {
  return pokemonList;
}

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
        console.log(pokemon);
      });
    });
  }


function loadList() {
  return fetch(apiURL).then(function (response) {
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

function loadDetails(item) {
  let url = item.detailsURL;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details){
    //Add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.heights;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

return {
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails,
  addListItem: addListItem
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
