let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(t){e.push(t)}function o(){return e}function i(e){var t;(t=e,fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){return t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types,t}).catch(function(e){console.error(e)})).then(function(){var t;let n,o,i;t=e,document.querySelector(".modal-container").classList.add("is-visible"),n=document.querySelector(".modal-body"),n.innerHTML="",o=document.createElement("p"),o.innerHTML="",i=document.createElement("img"),i.src=t.imageUrl,n.innerHTML="Pokemon name: "+t.name+"  ",o.innerHTML="Pokemon height: "+t.height+"  ",n.appendChild(o),n.appendChild(i)})}return t.results,window.addEventListener("keydown",e=>{let t=document.querySelector(".modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&document.querySelector(".modal-container").classList.remove("is-visible")}),{getAll:o,add:n,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),o=document.createElement("li"),r=document.createElement("button");o.classList.add("list-group-item"),r.innerText=t.name,r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#pokemonModal"),r.classList.add("pokemon-button","btn","btn-primary"),o.appendChild(r),n.appendChild(o),r.addEventListener("click",function(){i(t)})},loadList:function e(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},showDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});