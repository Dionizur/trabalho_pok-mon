const button = document.getElementById('redBtn');
const movieList = document.getElementById('movie-list');
button.addEventListener('click', () => {
  movieList.style.display = 'block'; // exibe a lista ao clicar no botão
});