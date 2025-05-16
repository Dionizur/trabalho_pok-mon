document.addEventListener('DOMContentLoaded', function() {
    const pokedex = document.getElementById('pokedex');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const pokemonModal = document.getElementById('pokemon-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    let currentPage = 1;
    const pokemonsPerPage = 50;
    let totalPokemons = 0;
    let allPokemons = [];
    let filteredPokemons = [];

    // Mapeamento dos tipos em inglês para português
    const tiposPT = {
        normal: 'Normal',
        fighting: 'Lutador',
        flying: 'Voador',
        poison: 'Veneno',
        ground: 'Terrestre',
        rock: 'Pedra',
        bug: 'Inseto',
        ghost: 'Fantasma',
        steel: 'Aço',
        fire: 'Fogo',
        water: 'Água',
        grass: 'Grama',
        electric: 'Elétrico',
        psychic: 'Psíquico',
        ice: 'Gelo',
        dragon: 'Dragão',
        dark: 'Noturno',
        fairy: 'Fada',
        unknown: 'Desconhecido',
        shadow: 'Sombra'
    };

    // Mapeamento dos status em inglês para português
    const statusPT = {
        hp: 'HP',
        attack: 'Ataque',
        defense: 'Defesa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defesa Especial',
        speed: 'Velocidade'
    };
    
    // Carrega todos os Pokémon uma vez
    fetchAllPokemons();
    
    // Event listeners
    searchButton.addEventListener('click', searchPokemon);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });
    
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadPokemons();
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            loadPokemons();
        }
    });
    
    closeModal.addEventListener('click', () => {
        pokemonModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === pokemonModal) {
            pokemonModal.style.display = 'none';
        }
    });
    
    // Função para buscar todos os Pokémon
    async function fetchAllPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
            const data = await response.json();
            
            // Ordena os Pokémon por ID (extraído da URL)
            allPokemons = data.results.sort((a, b) => {
                const idA = parseInt(a.url.split('/')[6]);
                const idB = parseInt(b.url.split('/')[6]);
                return idA - idB;
            });
            
            totalPokemons = data.count;
            filteredPokemons = [...allPokemons];
            loadPokemons();
        } catch (error) {
            console.error('Erro ao buscar a lista de Pokémon:', error);
        }
    }
    
    // Função para buscar Pokémon
    function searchPokemon() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredPokemons = [...allPokemons];
        } else {
            filteredPokemons = allPokemons.filter(pokemon => 
                pokemon.name.includes(searchTerm) || 
                pokemon.url.split('/')[6].includes(searchTerm)
            );
            
            // Mantém a ordenação mesmo após busca
            filteredPokemons.sort((a, b) => {
                const idA = parseInt(a.url.split('/')[6]);
                const idB = parseInt(b.url.split('/')[6]);
                return idA - idB;
            });
        }
        
        currentPage = 1;
        loadPokemons();
    }
    
    // Função para carregar os Pokémon da página atual
    async function loadPokemons() {
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex);
        
        pokedex.innerHTML = '';
        
        try {
            // Busca os dados de todos os Pokémon da página atual em paralelo
            const pokemonDataArray = await Promise.all(
                pokemonsToShow.map(pokemon => {
                    const pokemonId = pokemon.url.split('/')[6];
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => res.json());
                })
            );
            
            // Ordena os dados pelo ID do Pokémon
            pokemonDataArray.sort((a, b) => a.id - b.id);
            
            // Exibe os cards na ordem correta
            pokemonDataArray.forEach(pokemon => {
                displayPokemonCard(pokemon);
            });
        } catch (error) {
            console.error('Erro ao buscar dados dos Pokémon:', error);
        }
        
        updatePagination();
    }
    
    // Função para exibir o card do Pokémon
    function displayPokemonCard(pokemon) {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.addEventListener('click', () => showPokemonDetails(pokemon));
        
        const pokemonId = document.createElement('p');
        pokemonId.className = 'pokemon-id';
        pokemonId.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        
        const pokemonName = document.createElement('h2');
        pokemonName.className = 'pokemon-name';
        pokemonName.textContent = pokemon.name;
        
        const pokemonImg = document.createElement('img');
        pokemonImg.className = 'pokemon-img';
        pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
        pokemonImg.alt = pokemon.name;
        
        const pokemonTypes = document.createElement('div');
        pokemonTypes.className = 'pokemon-types';
        
        pokemon.types.forEach(type => {
            const typeSpan = document.createElement('span');
            typeSpan.className = `type ${type.type.name}`;
            // Traduz o tipo para português
            typeSpan.textContent = tiposPT[type.type.name] || type.type.name;
            pokemonTypes.appendChild(typeSpan);
        });
        
        pokemonCard.appendChild(pokemonId);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonTypes);
        
        pokedex.appendChild(pokemonCard);
    }
    
function showPokemonDetails(pokemon) {
    console.log('showPokemonDetails called with:', pokemon);
    modalBody.innerHTML = '';
    
    const pokemonId = document.createElement('p');
    pokemonId.className = 'modal-pokemon-id';
    pokemonId.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    
    const pokemonName = document.createElement('h2');
    pokemonName.className = 'modal-pokemon-name';
    pokemonName.textContent = pokemon.name;
    
    const pokemonImg = document.createElement('img');
    pokemonImg.className = 'modal-pokemon-img';
    pokemonImg.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;
    
    const pokemonTypes = document.createElement('div');
    pokemonTypes.className = 'modal-pokemon-types';
    
    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = `type ${type.type.name}`;
        // Traduz o tipo para português
        typeSpan.textContent = tiposPT[type.type.name] || type.type.name;
        pokemonTypes.appendChild(typeSpan);
    });
    
    const statsContainer = document.createElement('div');
    statsContainer.className = 'modal-stats';
    
    pokemon.stats.forEach(stat => {
        const statRow = document.createElement('div');
        statRow.className = 'stat-row';
        
        const statName = document.createElement('div');
        statName.className = 'stat-name';
        // Traduz o nome do status para português
        statName.textContent = statusPT[stat.stat.name] || stat.stat.name.replace('-', ' ');
        
        const statBarContainer = document.createElement('div');
        statBarContainer.className = 'stat-bar-container';
        
        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        statBar.style.width = `${Math.min(100, stat.base_stat)}%`;
        
        const statValue = document.createElement('div');
        statValue.className = 'stat-value';
        statValue.textContent = stat.base_stat;
        
        statBarContainer.appendChild(statBar);
        statRow.appendChild(statName);
        statRow.appendChild(statBarContainer);
        statRow.appendChild(statValue);
        statsContainer.appendChild(statRow);
    });
    
    modalBody.appendChild(pokemonId);
    modalBody.appendChild(pokemonName);
    modalBody.appendChild(pokemonImg);
    modalBody.appendChild(pokemonTypes);
    modalBody.appendChild(statsContainer);
    pokemonModal.style.display = 'block';
}
    
    // Função para atualizar a paginação
    function updatePagination() {
        const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${maxPage}`;
        
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === maxPage;
    }
});
