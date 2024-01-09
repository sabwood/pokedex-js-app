// Height is measured in cm.
// pokemonList = [{name: 'Beedrill', height: 100, type: ['bug', 'poison']}, {name: 'Serperior', height: 330, type: ['grass', 'poison']}, {name: 'Gothorita', height: 70, type: ['psychic', 'fighting']} ]

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('.modal-container');

    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Pokemon height' + ': ' + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;
    
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
  
    button.innerText = pokemon.name;
    button.classList.add('list-group-item pokemon-button');
  
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
        showModal(pokemon);
    });
  }

  return {
    getAll: function(){
        return pokemonList;
    },
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
      });
});

