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