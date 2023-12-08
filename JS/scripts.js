// Height is measured in cm.
let pokemonList = [{name: 'Beedrill', height: 100, type: ['bug', 'poison']},
{name: 'Serperior', height: 330, type: ['grass', 'poison']},
{name: 'Gothorita', height: 70, type: ['psychic', 'fighting']}
]

pokemonList.forEach(function(pokemon){
  if (pokemon.height > 150) // Condition for pokemon with the height > 150cm
    {document.write(
      pokemon.name + 
      "  " + 
      "(height:"+ 
      "  " +  
      pokemon.height + 
      " ) " + 
      "- Wow. That\'s big!"+ 
      "<br>"
    );
  } else {
    document.write(
      pokemon.name + 
      "  " + 
      "(height:"+ 
      "  " +  
      pokemon.height + 
      " ) " + 
      "<br>"
    );
  }
});
