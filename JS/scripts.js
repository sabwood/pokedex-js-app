// Height is measured in cm.
// pokemonList = [{name: 'Beedrill', height: 100, type: ['bug', 'poison']}, {name: 'Serperior', height: 330, type: ['grass', 'poison']}, {name: 'Gothorita', height: 70, type: ['psychic', 'fighting']} ]

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
  
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
  
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    
    button.addEventListener("click", function(event) {
        showDetails(pokemon);
    });
  }

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
        return item;
    }).catch(function(e) {
        console.error(e);
    });
}

function add (pokemon) {
    pokemonList.push(pokemon);
}

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        console.log(pokemon);
    });
}

  return {
    getAll: function(){
        return pokemonList;
    },
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
      });
});
