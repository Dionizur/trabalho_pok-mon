// script.js

// puxando o Json do sever
fetch('./db.json')
  .then(response => response.json())
  .then(data => {
    const games = data.games;
    const gamesList = document.getElementById('games-list');

    games.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');

      gameCard.innerHTML = `
        <h2>${game.title}</h2>
        <img src="${game.imageUrl}" alt="${game.title}" class="game-img" />
        <p><strong>Data de Lançamento:</strong> ${game.releaseDate}</p>
        <p>${game.description}</p>
        <button class="toggle-info">Informações adicionais</button>
        <div class="additional-info" style="display: none;">
          <p><strong>Detalhes:</strong> ${game.additionalInfo}</p>
          <p><strong>Onde Comprar:</strong> ${game.purchaseInfo}</p>
        </div>
      `;

      // Clique no botão para expandir card e mostrar infos
      gameCard.querySelector('.toggle-info').addEventListener('click', () => {
        const info = gameCard.querySelector('.additional-info');
        const isHidden = info.style.display === 'none';
        info.style.display = isHidden ? 'block' : 'none';
        gameCard.classList.toggle("expanded", isHidden);
      });

      gamesList.appendChild(gameCard);
    });
  })
  .catch(error => console.error('Erro ao carregar JSON:', error));


// Animação do exter egg
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo-img");

  // Pulsa sempre
  logo.classList.add("pulse");

  // Gira e troca imagem ao clicar
  logo.addEventListener("click", function() {
    logo.classList.add("spin");

    if (this.src.includes("pokeball.webp")) {
      this.src = "./assets/img/pokebola2.png";
    } else {
      this.src = "./assets/pokeball.webp";
    }

    setTimeout(() => logo.classList.remove("spin"), 600);
  });
});
