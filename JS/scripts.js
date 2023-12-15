// Height is measured in cm.
let pokemonRepository = (function(){
  let pokemonList = [
    {name: 'Beedrill', height: 100, type: ['bug', 'poison']},
    {name: 'Serperior', height: 330, type: ['grass', 'poison']},
    {name: 'Gothorita', height: 70, type: ['psychic', 'fighting']}
  ];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    })
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList
  };
})();

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name: 'Swoobat', height: 90, type: ['psychic', 'fighting']}))

function showDetails(pokemon) {
    console.log(pokemon);
}

function addListItem(pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');

  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');

  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  
  button.addEventListener("click", function () {
    showDetails(pokemon.name)
  });
}

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
      });
});
