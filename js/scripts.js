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
return {
  add: add,
  getAll: getAll
};
})();

document.write('<h1>' + "How tall are they?" + '</h1>');
document.write("<br></br>");

/* iterates through the pokemon array using the forEach Method and prints the
name and height of each and adds a line break.  */
pokemonRepository.getAll().forEach(function(item) {
  var pokeName = item.name;
  var pokeHeight = item.height;
  document.write(pokeName + '\'s' + ' height is ' +
  pokeHeight + '.');
  document.write("<br></br>")
});
document.write("<hr>");


/* A test of the ability to add a POKEMON to the array*/
pokemonRepository.add({name: 'Fred', height: 5.11, type: ['javescript_noob']});

/* test the ability to call new added item to the array*/
pokemonRepository.getAll().forEach(function(item) {
  var pokeName = item.name;
  var pokeHeight = item.height;
  document.write(pokeName + '\'s' + ' height is ' +
  pokeHeight + '.' + '<br></br>');
});
