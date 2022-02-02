//Creates a IIFE protected repository for POKEMON for the PokeDex project//
let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
function add(pokemon) {
  pokemonList.push(pokemon);
}
function getAll() {
  return pokemonList;
}
//function to populate the bootstrap modal w/ content from loadDetails Func.
function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  // clear existing content of the modalBody
  modalHeader.empty();
  modalTitle.empty();
  modalBody.empty();
  //creating element for name in modal content
  let nameElement = $("<h1>" + pokemon.name.toUpperCase() + "</h1>");
  // create img in modal content
  let imageElement = $("<img class='modal-img' style=width:40%>");
  imageElement.attr("src", pokemon.imageUrl);
  let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
  let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
  // get both types if both exist, add to array alsoTypes
  let alsoTypes = [];
   pokemon.types.forEach((element) => {
     alsoTypes.push(' ' + element.type.name)
   })
   //create element for types
  let typesElement = $("<p>" + "type(s) : " + alsoTypes + "<p>");
  //Append Variable to the bootstrap modalBody
  modalHeader.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
}

/*Create a function to search the UL Pokemon List and return pokemon in the list
that match user input*/
function pokeSearch(value) {
//Clear the list when any value is added to the INPUT
document.getElementById('pokemon-list').innerHTML="";

/*iterate over the pokemonList and check if the value is found
if true; run the addListItem function to add the name to the UL on the page*/
pokemonList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().includes(value.toLowerCase())){
        addListItem(pokemon);
      }
    })
  }


/*Function to create AND add <li> elements with pokemon names from the pokemonList
array and adds buttons to the <li> with the names.*/
function addListItem(pokemon) {

  let listCreator = document.querySelector('.list-group');
  listCreator.classList.add('list-unstyled')
  let listItemCreator = document.createElement("li");
  listItemCreator.classList.add('group-list-item');
  let button = document.createElement("button");
  button.classList.add('btn', 'btn-primary');
  button.setAttribute('data-toggle', "modal");
  button.setAttribute('data-target', "#pokeModal")
  button.innerText = pokemon.name;
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
    item.types = details.types;
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
  pokeSearch: pokeSearch,
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
