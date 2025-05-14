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
    let allPokemonData = []; // armazenar dados completos incluindo geração
    let selectedGeneration = 'all';
    
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
    
    const statusPT = {
        hp: 'HP',
        attack: 'Ataque',
        defense: 'Defesa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defesa Especial',
        speed: 'Velocidade'
    };
    
    fetchAllPokemons();
    
    const generationSelect = document.getElementById('generation-select');
    generationSelect.addEventListener('change', () => {
        selectedGeneration = generationSelect.value;
        filterPokemons();
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
    
    async function fetchAllPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
            const data = await response.json();
            
            allPokemons = data.results.sort((a, b) => {
                const idA = parseInt(a.url.split('/')[6]);
                const idB = parseInt(b.url.split('/')[6]);
                return idA - idB;
            });
            
            totalPokemons = data.count;
            filteredPokemons = [...allPokemons];
            await fetchAllPokemonData();
            filterPokemons();
        } catch (error) {
            console.error('Erro ao buscar a lista de Pokémon:', error);
        }
    }
    
    async function fetchAllPokemonData() {
        allPokemonData = [];
        for (const pokemon of allPokemons) {
            const pokemonId = pokemon.url.split('/')[6];
            try {
                const [pokemonRes, speciesRes] = await Promise.all([
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                ]);
                const pokemonData = await pokemonRes.json();
                const speciesData = await speciesRes.json();
                pokemonData.generation = speciesData.generation.name.replace('generation-', '');
                allPokemonData.push(pokemonData);
            } catch (error) {
                console.error(`Erro ao buscar dados do Pokémon ID ${pokemonId}:`, error);
            }
        }
    }
    
    function searchPokemon() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredPokemons = [...allPokemons];
        } else {
            filteredPokemons = allPokemons.filter(pokemon => 
                pokemon.name.includes(searchTerm) || 
                pokemon.url.split('/')[6].includes(searchTerm)
            );
            
            filteredPokemons.sort((a, b) => {
                const idA = parseInt(a.url.split('/')[6]);
                const idB = parseInt(b.url.split('/')[6]);
                return idA - idB;
            });
        }
        
        currentPage = 1;
        filterPokemons();
    }
    
    function filterPokemons() {
        let filtered = allPokemonData;
        const searchTerm = searchInput.value.toLowerCase().trim();
    
        if (searchTerm !== '') {
            filtered = filtered.filter(pokemon =>
                pokemon.name.includes(searchTerm) ||
                pokemon.id.toString().includes(searchTerm)
            );
        }
    
        if (selectedGeneration !== 'all') {
            filtered = filtered.filter(pokemon => pokemon.generation === selectedGeneration);
        }
    
        filteredPokemons = filtered.map(pokemon => ({
            name: pokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
        }));
    
        currentPage = 1;
        loadPokemons();
    }
    
    async function loadPokemons() {
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex);
        
        pokedex.innerHTML = '';
        
        try {
            const pokemonDataArray = pokemonsToShow.map(pokemon => {
                return allPokemonData.find(p => p.id === parseInt(pokemon.url.split('/')[6]));
            }).filter(p => p !== undefined);
            
            pokemonDataArray.sort((a, b) => a.id - b.id);
            
            pokemonDataArray.forEach(pokemon => {
                displayPokemonCard(pokemon);
            });
        } catch (error) {
            console.error('Erro ao buscar dados dos Pokémon:', error);
        }
        
        updatePagination();
    }
    
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
    
    function updatePagination() {
        const maxPage = Math.ceil(filteredPokemons.length / pokemonsPerPage);
        pageInfo.textContent = `Página ${currentPage} de ${maxPage}`;
        
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === maxPage;
    }