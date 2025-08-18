async function getRandomPokemon() {
    try {
        const randomId = Math.floor(Math.random() * 1010) + 1;

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
        return null;
    }
}

async function displayRandomPokemon() {
    const pokemonDisplay = document.getElementById('pokemon-display');
    pokemonDisplay.innerHTML = '<p>Carregando Pokémon...</p>';

    const pokemon = await getRandomPokemon();

    if (pokemon) {
        const typeColors = {
            normal: '#A8A878',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            grass: '#78C850',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC'
        };

        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        const typeBadges = types.map(type => `
            <span class="type-badge" style="background-color: ${typeColors[type] || '#777'}">
                ${type}
            </span>
        `).join('');

        pokemonDisplay.innerHTML = `
            <img class="pokemon-image" src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p class="pokemon-name">${pokemon.name}</p>
            <div class="pokemon-types">
                ${typeBadges}
            </div>
            <p>Nº ${pokemon.id}</p>
        `;
    } else {
        pokemonDisplay.innerHTML = '<p>Não foi possível carregar o Pokémon. Tente novamente!</p>';
    }
}

document.getElementById('refresh-btn').addEventListener('click', displayRandomPokemon);

window.addEventListener('load', displayRandomPokemon);