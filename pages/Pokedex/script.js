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

    // Conjunto para armazenar os IDs dos pokémons favoritados
    let favoritePokemons = new Set();

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
        dark: 'Sombrio',
        fairy: 'Fada',
        unknown: 'Desconhecido',
        shadow: 'Sombra'
    };

    const statusPT = {
        hp: 'HP',
        attack: 'Ataque',
        defense: 'Defesa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defesa Especial',
        speed: 'Velocidade'
    };

    // Função para carregar favoritos do localStorage
    function loadFavorites() {
        const storedFavorites = localStorage.getItem('favoritePokemons');
        if (storedFavorites) {
            try {
                const favArray = JSON.parse(storedFavorites);
                favoritePokemons = new Set(favArray);
            } catch (e) {
                console.error('Erro ao carregar favoritos do localStorage:', e);
            }
        }
    }

    // Função para salvar favoritos no localStorage
    function saveFavorites() {
        localStorage.setItem('favoritePokemons', JSON.stringify(Array.from(favoritePokemons)));
    }

let showFavoritesOnly = false;

fetchAllPokemons();

const toggleFavoritesButton = document.getElementById('toggle-favorites-button');
toggleFavoritesButton.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    if (showFavoritesOnly) {
        toggleFavoritesButton.textContent = 'Mostrar Todos';
        filterFavorites();
    } else {
        toggleFavoritesButton.textContent = 'Mostrar Favoritos';
        filteredPokemons = [...allPokemons];
        currentPage = 1;
        loadPokemons();
    }
});

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

const prev5PagesButton = document.getElementById('prev-5-pages');
prev5PagesButton.addEventListener('click', () => {
    if (currentPage > 5) {
        currentPage -= 5;
    } else {
        currentPage = 1;
    }
    loadPokemons();
});

nextPageButton.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        loadPokemons();
    }
});

const next5PagesButton = document.getElementById('next-5-pages');
next5PagesButton.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
    if (currentPage + 5 <= maxPage) {
        currentPage += 5;
    } else {
        currentPage = maxPage;
    }
    loadPokemons();
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
        console.log('fetchAllPokemons called');
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('fetchAllPokemons data received:', data);

            // Ordena os Pokémon por ID (extraído da URL)
            allPokemons = data.results.sort((a, b) => {
                const idA = parseInt(a.url.split('/')[6]);
                const idB = parseInt(b.url.split('/')[6]);
                return idA - idB;
            });

            // Filtra para incluir apenas Pokémon até o ID 1024
            allPokemons = allPokemons.filter(pokemon => {
                const id = parseInt(pokemon.url.split('/')[6]);
                return id <= 1024;
            });
            
            totalPokemons = allPokemons.length;
            filteredPokemons = [...allPokemons];
            loadFavorites();
            loadPokemons();
        } catch (error) {
            console.error('Erro ao buscar a lista de Pokémon:', error);
        }
    }
    
    // Função para buscar Pokémon
    async function loadPokemons() {
        console.log('loadPokemons called');
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex);
        
        pokedex.innerHTML = '';
        
        try {
            // Busca os dados de todos os Pokémon da página atual em paralelo
            const pokemonDataArray = await Promise.all(
                pokemonsToShow.map(pokemon => {
                    const pokemonId = pokemon.url.split('/')[6];
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    });
                })
            );
            console.log('loadPokemons pokemonDataArray received:', pokemonDataArray);
            
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
    
    function filterFavorites() {
        filteredPokemons = allPokemons.filter(pokemon => favoritePokemons.has(pokemon.url.split('/')[6]));
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

        // Evento para abrir modal ao clicar no card (exceto no ícone de favorito)
        pokemonCard.addEventListener('click', (event) => {
            if (!event.target.classList.contains('favorite-icon')) {
                showPokemonDetails(pokemon);
            }
        });
        
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

        // Ícone de favorito
        const favoriteIcon = document.createElement('span');
        favoriteIcon.className = 'favorite-icon';
        favoriteIcon.innerHTML = favoritePokemons.has(pokemon.id.toString()) ? '&#10084;' : '&#9825;'; // coração cheio ou vazio
        favoriteIcon.title = favoritePokemons.has(pokemon.id.toString()) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        favoriteIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // evita abrir o modal
            const pokemonIdStr = pokemon.id.toString();
            if (favoritePokemons.has(pokemonIdStr)) {
                favoritePokemons.delete(pokemonIdStr);
                favoriteIcon.innerHTML = '&#9825;';
                favoriteIcon.title = 'Adicionar aos favoritos';
            } else {
                favoritePokemons.add(pokemonIdStr);
                favoriteIcon.innerHTML = '&#10084;';
                favoriteIcon.title = 'Remover dos favoritos';
            }
            saveFavorites();
        });

        pokemonCard.appendChild(favoriteIcon);
        pokemonCard.appendChild(pokemonId);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonTypes);
        
        pokedex.appendChild(pokemonCard);
    }
    
    async function showPokemonDetails(pokemon) {
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
        
        // Exibir habilidades
        const abilitiesContainer = document.createElement('div');
        abilitiesContainer.className = 'modal-abilities';
        const abilitiesTitle = document.createElement('h3');
        abilitiesTitle.textContent = 'Habilidades';
        abilitiesContainer.appendChild(abilitiesTitle);
        
        pokemon.abilities.forEach(abilityInfo => {
            const ability = document.createElement('p');
            ability.textContent = abilityInfo.ability.name;
            abilitiesContainer.appendChild(ability);
        });

        // Buscar e exibir cadeia de evolução
        const evolutionContainer = document.createElement('div');
        evolutionContainer.className = 'modal-evolution';
        const evolutionTitle = document.createElement('h3');
        evolutionTitle.textContent = 'Evolução';
        evolutionContainer.appendChild(evolutionTitle);

        try {
            const speciesResponse = await fetch(pokemon.species.url);
            if (!speciesResponse.ok) throw new Error('Erro ao buscar dados da espécie');
            const speciesData = await speciesResponse.json();

            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            if (!evolutionResponse.ok) throw new Error('Erro ao buscar cadeia de evolução');
            const evolutionData = await evolutionResponse.json();

            const evolutionChain = [];
            let current = evolutionData.chain;

            do {
                evolutionChain.push({
                    name: current.species.name,
                    url: current.species.url
                });
                current = current.evolves_to[0];
            } while (current && current.hasOwnProperty('evolves_to'));

            evolutionChain.forEach(evo => {
                const evoElement = document.createElement('p');
                evoElement.textContent = evo.name;
                evolutionContainer.appendChild(evoElement);
            });
        } catch (error) {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Não foi possível carregar a cadeia de evolução.';
            evolutionContainer.appendChild(errorMsg);
            console.error(error);
        }
        
        const statsContainer = document.createElement('div');
        statsContainer.className = 'modal-stats';
        
        pokemon.stats.forEach(stat => {
            const statRow = document.createElement('div');
            statRow.className = 'stat-row';
            
            const statName = document.createElement('div');
            statName.className = 'stat-name';
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
        modalBody.appendChild(abilitiesContainer);
        modalBody.appendChild(evolutionContainer);
        modalBody.appendChild(statsContainer);
        pokemonModal.style.display = 'block';
    }
    
    function updatePagination() {
        const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${maxPage}`;
        
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === maxPage;
    }
});
