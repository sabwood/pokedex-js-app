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

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function(e) {
        console.error(e);
    });
}

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name: 'Swoobat', height: 90, type: ['psychic', 'fighting']}))

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        console.log(pokemon);
    });
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
