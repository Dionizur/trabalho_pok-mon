document.addEventListener('DOMContentLoaded', () => {
  const games = [
    {
      title: 'Pokémon Red & Blue',
      releaseDate: '27 de fevereiro de 1996',
      description: 'Os primeiros jogos da franquia, lançados para o Game Boy, introduziram os 151 Pokémon originais e o conceito de captura, treinamento e batalhas.',
      additionalInfo: 'Pokémon Red & Blue revolucionaram o mundo dos videogames, introduzindo a mecânica de trocas entre jogadores e batalhas em turnos. Esses jogos também introduziram as características de captura e o conceito de "Pokédex", que é uma enciclopédia de Pokémon.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/PokemonRedBox.jpg'
    },
    {
      title: 'Pokémon Gold & Silver',
      releaseDate: '21 de novembro de 1999',
      description: 'Introduziram a região Johto e 100 novos Pokémon, além de recursos como ciclo de dia e noite, o que trouxe uma nova dinâmica ao jogo.',
      additionalInfo: 'Gold & Silver são considerados por muitos os melhores jogos da série, com uma grande expansão da franquia. Eles trouxeram uma nova mecânica de jogabilidade com o "Pokémon Shiny" e adicionaram o conceito de **Pokémon míticos** e lendários. Além disso, o jogo permitiu aos jogadores retornarem à região Kanto após completar Johto.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Pokemon_Gold_Box.jpg'
    },
    {
      title: 'Pokémon Ruby & Sapphire',
      releaseDate: '21 de novembro de 2002',
      description: 'Apresentaram a região Hoenn e batalhas duplas, com gráficos mais coloridos e novas mecânicas, como habilidades de Pokémon.',
      additionalInfo: 'Esses jogos marcaram a transição para o **Game Boy Advance**, trazendo gráficos mais coloridos e um mundo mais dinâmico. Introduziram a mecânica de **batalhas duplas**, onde dois Pokémon lutam simultaneamente, e o sistema de habilidades, dando a cada Pokémon uma habilidade única. A região de Hoenn é repleta de diversidade, com climas tropicais e muitos eventos relacionados aos lendários Kyogre, Groudon e Rayquaza.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Pokemon_Ruby_Box.jpg'
    },
    {
      title: 'Pokémon Diamond & Pearl',
      releaseDate: '28 de setembro de 2006',
      description: 'Levaram os jogadores à região Sinnoh e introduziram os gráficos 3D no Nintendo DS, além de novos tipos e movimentos de Pokémon.',
      additionalInfo: 'Esses jogos trouxeram a quarta geração de Pokémon, com o suporte para gráficos 3D. A região Sinnoh foi rica em cultura e história, e o enredo girou em torno da organização **Team Galactic** e sua tentativa de manipular os Pokémon lendários **Dialga** e **Palkia**. Além disso, o **Sistema de Troca Global (GTS)** permitiu que jogadores de diferentes partes do mundo trocassem Pokémon online.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/86/Pokemon_Diamond_Box.jpg'
    },
    {
      title: 'Pokémon Legends: Arceus',
      releaseDate: '28 de janeiro de 2022',
      description: 'RPG de ação com mundo aberto, ambientado na região Hisui, prequela de Diamond e Pearl, oferecendo uma nova experiência de captura e exploração de Pokémon.',
      additionalInfo: 'Pokémon Legends: Arceus foi um dos maiores saltos para a franquia, com uma mecânica de **mundo aberto**, onde os jogadores podem capturar Pokémon diretamente no ambiente sem batalhas prévias. O jogo se passa no passado da região Sinnoh, e foca na criação do primeiro **Pokédex** da região, com uma história centrada no Pokémon lendário **Arceus**. A inovação principal foi a mudança de foco, dando aos jogadores maior liberdade para explorar e interagir com o mundo.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Pok%C3%A9mon_Legends_Arceus_cover_art.jpg'
    }
  ];

  const gamesList = document.getElementById('games-list');

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.innerHTML = `
      <img src="${game.imageUrl}" alt="${game.title}">
      <div class="content">
        <h3>${game.title}</h3>
        <p><strong>Lançamento:</strong> ${game.releaseDate}</p>
        <p><strong>Descrição:</strong> ${game.description}</p>
        <p><strong>Informações adicionais:</strong> ${game.additionalInfo}</p>
      </div>
    `;
    gamesList.appendChild(gameCard);
  });
});
