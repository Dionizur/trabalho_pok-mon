const button = document.getElementById('redBtn');
const movieList = document.getElementById('movie-list');
button.addEventListener('click', () => {
    // Alterna a exibição da lista de filmes
    if (movieList.style.display === 'none' || movieList.style.display === '') {
        movieList.style.display = 'block'; // Exibe a lista
    } else {
        movieList.style.display = 'none'; // Oculta a lista
    }
});

async function fetchAlcremie() {
    const container = document.getElementById('alcremie-container');
    if (!container) return; // Sai se não encontrar o container

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/alcremie');
        const data = await response.json();
        
        // Limpa o container antes de adicionar novos elementos
        container.innerHTML = ''; 
        
        // Cria e estiliza a imagem
        const img = document.createElement('img');
        img.src = data.sprites.other['official-artwork'].front_default;
        img.alt = 'Alcremie';
        img.style.maxWidth = '100%';
        
        // Adiciona à página
        container.appendChild(img);

    } catch (error) {
        container.innerHTML = '<p class="error">Pokémon não encontrado</p>';
    }
}

window.addEventListener('DOMContentLoaded', fetchAlcremie);