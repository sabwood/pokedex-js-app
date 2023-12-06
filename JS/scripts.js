// Height is measured in cm.
let pokemonList = [{name: 'Beedrill', height: 100, type: ['bug', 'poison']},
{name: 'Serperior', height: 330, type: ['grass', 'poison']},
{name: 'Gothorita', height: 70, type: ['psychic', 'fighting']}
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 150) // Condition for pokemon with the height > 150cm
     {document.write(pokemonList[i].name + "  " + "(height:"+ "  " +  pokemonList[i].height + " ) " + "- Wow. That\'s big!"+ "<br>");
    } else {
  document.write(pokemonList[i].name + "  " + "(height:"+ "  " +  pokemonList[i].height + " ) " + "<br>");}
  }