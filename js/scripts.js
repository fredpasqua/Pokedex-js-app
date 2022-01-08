//Creates a IIFE protected repository for POKEMON for the PokeDex project//
let pokemonRepository = (function () {
let pokemonList = [
{name: 'Bulbasaur',height: .7, type: ['grass', 'poison']},
{name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
{name: 'Venesaur', height: 2, type: ['grass', 'poison']}
];
function add(pokemon) {
  pokemonList.push(pokemon);
}
function getAll() {
  return pokemonList;
}

/*Function to create add li elements with pokemon names from the pokemonList array
and adds buttons to the li with the names.*/
function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add('button-style');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function showDetails() {
    console.log(pokemon.name);
  });

  };

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

});
