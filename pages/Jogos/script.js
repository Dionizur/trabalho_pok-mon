document.addEventListener('DOMContentLoaded', () => {
  const games = [
    {
      title: 'Pokémon Red & Blue',
      releaseDate: '27 de fevereiro de 1996',
      description: 'Os primeiros jogos da franquia, lançados para o Game Boy, introduziram os 151 Pokémon originais e o conceito de captura, treinamento e batalhas.',
      additionalInfo: 'Pokémon Red & Blue revolucionaram o mundo dos videogames, introduzindo a mecânica de trocas entre jogadores e batalhas em turnos. Esses jogos também introduziram as características de captura e o conceito de "Pokédex", que é uma enciclopédia de Pokémon.',
      purchaseInfo: 'Disponíveis em formato digital na Nintendo eShop para consoles compatíveis. Cópias físicas podem ser adquiridas em lojas especializadas ou marketplaces como Mercado Livre e OLX.',
      imageUrl: './assets/img/pokemonredblue.jpg'
    },
    {
      title: 'Pokémon Gold & Silver',
      releaseDate: '21 de novembro de 1999',
      description: 'Introduziram a região Johto e 100 novos Pokémon, além de recursos como ciclo de dia e noite, o que trouxe uma nova dinâmica ao jogo.',
      additionalInfo: 'Gold & Silver são considerados por muitos os melhores jogos da série, com uma grande expansão da franquia. Eles trouxeram uma nova mecânica de jogabilidade com o "Pokémon Shiny" e adicionaram o conceito de **Pokémon míticos** e lendários. Além disso, o jogo permitiu aos jogadores retornarem à região Kanto após completar Johto.',
      purchaseInfo: 'Disponíveis em formato digital na Nintendo eShop para consoles compatíveis. Cópias físicas podem ser encontradas em lojas especializadas ou marketplaces como Mercado Livre e OLX.',
      imageUrl: './assets/img/pokemongoldandsilver.jpg'
    },
    {
      title: 'Pokémon Ruby & Sapphire',
      releaseDate: '21 de novembro de 2002',
      description: 'Apresentaram a região Hoenn e batalhas duplas, com gráficos mais coloridos e novas mecânicas, como habilidades de Pokémon.',
      additionalInfo: 'Esses jogos marcaram a transição para o **Game Boy Advance**, trazendo gráficos mais coloridos e um mundo mais dinâmico. Introduziram a mecânica de **batalhas duplas**, onde dois Pokémon lutam simultaneamente, e o sistema de habilidades, dando a cada Pokémon uma habilidade única. A região de Hoenn é repleta de diversidade, com climas tropicais e muitos eventos relacionados aos lendários Kyogre, Groudon e Rayquaza.',
      purchaseInfo: 'Disponíveis em formato digital na Nintendo eShop para consoles compatíveis. Cópias físicas podem ser adquiridas em lojas especializadas ou marketplaces como Mercado Livre e OLX.',
      imageUrl: './assets/img/pokemonruby.jpg'
    },
    {
      title: 'Pokémon Diamond & Pearl',
      releaseDate: '28 de setembro de 2006',
      description: 'Levaram os jogadores à região Sinnoh e introduziram os gráficos 3D no Nintendo DS, além de novos tipos e movimentos de Pokémon.',
      additionalInfo: 'Esses jogos trouxeram a quarta geração de Pokémon, com o suporte para gráficos 3D. A região Sinnoh foi rica em cultura e história, e o enredo girou em torno da organização **Team Galactic** e sua tentativa de manipular os Pokémon lendários **Dialga** e **Palkia**. Além disso, o **Sistema de Troca Global (GTS)** permitiu que jogadores de diferentes partes do mundo trocassem Pokémon online.',
      purchaseInfo: 'Disponíveis em formato digital na Nintendo eShop para consoles compatíveis. Cópias físicas podem ser encontradas em lojas especializadas ou marketplaces como Mercado Livre e OLX.',
      imageUrl: './assets/img/pokemondimond.jpg'
    },
    {
      title: 'Pokémon Legends: Arceus',
      releaseDate: '28 de janeiro de 2022',
      description: 'RPG de ação com mundo aberto, ambientado na região Hisui, prequela de Diamond e Pearl, oferecendo uma nova experiência de captura e exploração de Pokémon.',
      additionalInfo: 'Pokémon Legends: Arceus foi um dos maiores saltos para a franquia, com uma mecânica de **mundo aberto**, onde os jogadores podem capturar Pokémon diretamente no ambiente sem batalhas prévias. O jogo se passa no passado da região Sinnoh, e foca na criação do primeiro **Pokédex** da região, com uma história centrada no Pokémon lendário **Arceus**. A inovação principal foi a mudança de foco, dando aos jogadores maior liberdade para explorar e interagir com o mundo.',
      purchaseInfo: 'Disponível em formato digital na Nintendo eShop para consoles compatíveis. Cópias físicas podem ser adquiridas em lojas especializadas ou marketplaces como Mercado Livre e OLX.',
      imageUrl: './assets/img/pokemonarceus.jpg'
    }
  ];

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

    gameCard.querySelector('.toggle-info').addEventListener('click', () => {
      const info = gameCard.querySelector('.additional-info');
      info.style.display = info.style.display === 'none' ? 'block' : 'none';
    });

    gamesList.appendChild(gameCard);
  });
});
