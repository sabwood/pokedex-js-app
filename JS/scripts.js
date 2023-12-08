// Height is measured in cm.
let pokemonRepository = (function(){
  let pokemonList = [
    {name: 'Beedrill', height: 100, type: ['bug', 'poison']},
    {name: 'Serperior', height: 330, type: ['grass', 'poison']},
    {name: 'Gothorita', height: 70, type: ['psychic', 'fighting']}
  ];

  return {
    getAll: function(){
        return pokemonList;
    },
    add: function (item) {
      pokemonList.push(item);
    }
  }
})();

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name: 'Swoobat', height: 90, type: ['psychic', 'fighting'] }));

pokemonRepository.getAll().forEach(function(pokemon){
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
