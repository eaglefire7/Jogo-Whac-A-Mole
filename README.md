# Whac-A-Mole Game

Este é um jogo simples de Whac-A-Mole com dois jogadores, desenvolvido em HTML, CSS e JavaScript. O jogo segue a seguinte lógica: 

1. O **Jogador 1** começa a jogar, e tem 45 segundos para clicar nos círculos coloridos que aparecem aleatoriamente na tela. 
2. Ao final do tempo, o **Jogador 2** é acionado e também tem 45 segundos para jogar. 
3. No final da partida, os resultados de ambos os jogadores são exibidos na tela, lado a lado e alinhados horizontalmente na altura do cronômetro.

## Funcionalidades

- **Dois jogadores**: Cada jogador joga separadamente com o seu próprio tempo e resultado.
- **Cronômetro**: Cada jogador tem 45 segundos para jogar, com o cronômetro exibido no topo da tela.
- **Cores e pontuação**: Os círculos possuem cores que influenciam na pontuação:
  - **Verde**: +3 pontos
  - **Amarelo**: -1 ponto
  - **Vermelho**: -2 pontos
- **Exibição de resultados**: Após o término da partida do segundo jogador, os resultados de ambos são exibidos lado a lado, mostrando a quantidade de cliques em cada cor e a pontuação final.

## Tecnologias Utilizadas

- **HTML5**: Estruturação da página.
- **CSS3**: Estilização da página e do layout responsivo.
- **JavaScript**: Implementação da lógica do jogo, cronômetro, pontuação e transição entre jogadores.

## Estrutura do Projeto

Whac-A-Mole/
│
├── index.html          # Página principal do jogo
├── styles.css          # Estilos do jogo
└── script.js           # Lógica do jogo em JavaScript


## Como Jogar

1. **Inicie o jogo**: O jogo começa automaticamente para o **Jogador 1** com o cronômetro em 45 segundos.
2. **Troca de jogadores**: Ao final do tempo do **Jogador 1**, o botão "Iniciar Jogador 2" aparecerá. Clique neste botão para começar o turno do **Jogador 2**.
3. **Resultados**: Após o término do **Jogador 2**, os resultados dos dois jogadores serão exibidos na mesma tela, com os detalhes de cliques em cada cor e a pontuação de cada um.

## Estrutura e Resultados

Os resultados são apresentados de forma horizontal com:
- **Jogador 1** do lado esquerdo.
- **Jogador 2** do lado direito.
Os dados incluem:
- Número total de cliques.
- Número de cliques em cada cor (Verde, Amarelo, Vermelho).

## Personalização

Você pode personalizar o jogo, alterando:
- O tempo de jogo (definido como 45 segundos).
- A pontuação atribuída a cada cor.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/whac-a-mole-game.git
