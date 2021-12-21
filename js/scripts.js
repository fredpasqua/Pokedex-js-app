let pokemonList = [
{name: 'Bulbasaur',height: .7, type: ['grass', 'poison']},
{name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
{name: 'Venesaur', height: 2, type: ['grass', 'poison']}
];

document.write("How tall are they?");
document.write("<br>");

/*iterates through the pokemon array and prints the height of each
and adds a line break.*/

for (let i = 0; i < pokemonList.length; i++) {
  var pokeName = pokemonList[i].name;
  var pokeHeight = pokemonList[i].height;
  document.write(pokeName + '\'s' + ' height is ' +
  pokeHeight + '.');

//checks the height and returns statement for large pokemon
if (pokeHeight >= 2) {
    document.write('  Wow, that\'s big!');
  }

  document.write("<br>");
}
