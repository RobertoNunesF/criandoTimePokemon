const containerPokemon = document.querySelector('.pokedex');

async function buscarEMostrarPokemon() {
    try {
        const lista = await fetch('./backend/pokemon.json');
        const pokemons = await lista.json();

        pokemons.forEach(pokemon => {
            const cardTypes = pokemon.type2 ? `${pokemon.type1}-${pokemon.type2}` : pokemon.type1;
            const pokemonTypes = pokemon.type2 ? `${pokemon.type1}/${pokemon.type2}` : pokemon.type1;
                containerPokemon.innerHTML += `
                <div class="card ${cardTypes}">
                    <h3>#${pokemon.number}</h3>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png" alt="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                    <p>${pokemonTypes}</p>
                </div>
                `;   
        });
    } catch(error) {
        containerPokemon.innerHTML = `<p>Erro ao carregar o JSON: ${error}</p>`;
    }
    
}

buscarEMostrarPokemon();
