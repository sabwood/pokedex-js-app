// Height is measured in cm.
// pokemonList = [{name: 'Beedrill', height: 100, type: ['bug', 'poison']}, {name: 'Serperior', height: 330, type: ['grass', 'poison']}, {name: 'Gothorita', height: 70, type: ['psychic', 'fighting']} ]

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
  }
    
    function hideModal() {
        let modalContainer = document.querySelector('.modal-container');

        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('.modal-container');

        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    function showModal() {
      let modalContainer = document.querySelector('.modal-container');

      modalContainer.classList.add('is-visible');

      let pokemonDetails = document.querySelector('.modal-body');

      pokemonDetails.innerHTML = '';

      pokemonDetails.innerHTML = 'Pokemon name' + ': ' + pokemon.name + '  ' + 'Pokemon height' + ': ' + pokemon.height + '  ' + pokemon.imageUrl;
    }
    
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    listItem.classList.add('list-group-item')

    button.innerText = pokemon.name;
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal')
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
  
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

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
      });
});

