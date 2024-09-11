const containerPokemon = document.querySelector('.pokedex');
const barraDePesquisa = document.querySelector('.pesquisar__input');

async function buscarEMostrarPokemon() {
    try {
        const lista = await fetch('./backend/pokemon.json');
        const pokemons = await lista.json();

        pokemons.forEach(pokemon => {
            const cardTypes = pokemon.type2 ? `${pokemon.type1}-${pokemon.type2}` : pokemon.type1;
            const pokemonTypes = pokemon.type2 ? `${pokemon.type1}/${pokemon.type2}` : pokemon.type1;
                containerPokemon.innerHTML += `
                <div class="card ${cardTypes}">
                    <h3 class="card__number">${pokemon.number}</h3>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png" alt="${pokemon.name}">
                    <h2 class="card__name">${pokemon.name}</h2>
                    <p class="card__type">${pokemonTypes}</p>
                </div>
                `;   
        });
    } catch(error) {
        containerPokemon.innerHTML = `<p>Erro ao carregar o JSON: ${error}</p>`;
    }
    
}

buscarEMostrarPokemon();

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa () {
    const pokemons = document.querySelectorAll('.card');
    const filtro = barraDePesquisa.value.toLowerCase();

    pokemons.forEach((pokemon) => {
        const name = pokemon.querySelector('.card__name').textContent.toLowerCase();
        const number = pokemon.querySelector('.card__number').textContent;
        const type = pokemon.querySelector('.card__type').textContent.toLowerCase();

        const corresponde = name.includes(filtro) || number.includes(filtro) || type.includes(filtro);
        
        pokemon.style.display = corresponde ? 'block': 'none';
    })
}