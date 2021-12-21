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
  document.write(pokemonList[i].name + '\'s' + ' height is ' +
  pokemonList[i].height + '.');

//checks the height and returns statement for large pokemon
if (pokemonList[i].height >= 2) {
    document.write('  Wow, that\'s big!');
  }

  document.write("<br>");
}
