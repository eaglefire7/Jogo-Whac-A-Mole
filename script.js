// Elementos da interface
const startScreen = document.getElementById('startScreen');
const playerFormScreen = document.getElementById('playerFormScreen');
const gameScreen = document.getElementById('gameScreen');
const resultDisplay = document.getElementById('resultDisplay');
const startButton = document.getElementById('startButton');
const playerForm = document.getElementById('playerForm');
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const timerDisplay = document.getElementById('timer');
const player1Results = document.getElementById('player1Results');
const player2Results = document.getElementById('player2Results');
const winnerDisplay = document.getElementById('winner');
const gameBoard = document.getElementById('gameBoard');
const startPlayer2Button = document.getElementById('startPlayer2Button');
const colorClicksDisplay = document.getElementById('colorClicksDisplay');

let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let playerScore = 0;
let remainingTime = 45;
let gameInterval;
let countdownInterval;
let clicksByColor = { green: 0, yellow: 0, red: 0 };
let player1Clicks = { green: 0, yellow: 0, red: 0 };
let player2Clicks = { green: 0, yellow: 0, red: 0 };
let moleElements = [];
let clickedMoles = new Set(); // Para rastrear os círculos clicados

// Inicia a tela de cadastro
startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  playerFormScreen.classList.remove('hidden');
});

// Captura nomes dos jogadores e inicia o jogo
playerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  player1Name = document.getElementById('player1Name').value;
  player2Name = document.getElementById('player2Name').value;
  document.getElementById('player1NameDisplay').textContent = player1Name;
  document.getElementById('player2NameDisplay').textContent = player2Name;
  playerFormScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  initializeGameBoard();
  startGame();
});

// Função para iniciar o jogo
function startGame() {
  remainingTime = 45;
  playerScore = 0;
  clicksByColor = { green: 0, yellow: 0, red: 0 };
  playerScoreDisplay.textContent = `Jogador ${currentPlayer}: 0 pontos`;
  timerDisplay.textContent = `Tempo: ${remainingTime}s`;
  
  clickedMoles.clear(); // Reseta os círculos clicados
  gameInterval = setInterval(applyRandomColors, 1000);
  countdownInterval = setInterval(updateTimer, 1000);
}

// Inicializa o tabuleiro de jogo
function initializeGameBoard() {
  gameBoard.innerHTML = ''; // Limpa o tabuleiro

  for (let i = 0; i < 12; i++) {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.addEventListener('click', handleMoleClick);
    gameBoard.appendChild(mole);
    moleElements.push(mole);
  }
}

// Função para atualizar o cronômetro
function updateTimer() {
  remainingTime--;
  timerDisplay.textContent = `Tempo: ${remainingTime}s`;

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    clearInterval(gameInterval);
    endRound();
  }
}

// Lógica de final de rodada
function endRound() {
  if (currentPlayer === 1) {
    // Guarda os dados do jogador 1 e exibe botão para o jogador 2
    player1Score = playerScore;
    player1Clicks = { ...clicksByColor };
    startPlayer2Button.classList.remove('hidden');
  } else {
    // Guarda os dados do jogador 2 e exibe o resultado final
    player2Score = playerScore;
    player2Clicks = { ...clicksByColor };
    showResults();
  }
}

// Exibe o resultado final e o vencedor
function showResults() {
  resultDisplay.classList.remove('hidden');
  
  player1Results.innerHTML = `
    <h3>${player1Name}</h3>
    <p>Pontos: ${player1Score}</p>
    <p>Verde: ${player1Clicks.green} </p>
    <p>Amarelo: ${player1Clicks.yellow} </p>
    <p>Vermelho: ${player1Clicks.red} </p>
  `;
  
  player2Results.innerHTML = `
    <h3>${player2Name}</h3>
    <p>Pontos: ${player2Score}</p>
    <p>Verde: ${player2Clicks.green} </p>
    <p>Amarelo: ${player2Clicks.yellow} </p>
    <p>Vermelho: ${player2Clicks.red} </p>
  `;
  
  const winner = player1Score > player2Score ? player1Name : player2Name;
  winnerDisplay.textContent = `Vencedor: ${winner}`;
}

// Inicia a rodada do jogador 2
startPlayer2Button.addEventListener('click', () => {
  currentPlayer = 2;
  startPlayer2Button.classList.add('hidden');
  startGame();
});

// Função para lidar com clique nos círculos
function handleMoleClick(e) {
  const mole = e.target;
  if (clickedMoles.has(mole)) return; // Ignora se já foi clicado
  clickedMoles.add(mole);
  
  if (mole.classList.contains('green')) {
    playerScore += 3;
    clicksByColor.green++;
  } else if (mole.classList.contains('yellow')) {
    playerScore -= 1;
    clicksByColor.yellow++;
  } else if (mole.classList.contains('red')) {
    playerScore -= 2;
    clicksByColor.red++;
  }

  playerScoreDisplay.textContent = `Jogador ${currentPlayer}: ${playerScore} pontos`;
  mole.classList.remove('green', 'yellow', 'red'); // Remove a cor após o clique
}

// Aplica cores aleatórias aos círculos
function applyRandomColors() {
  clickedMoles.clear(); // Permite que os círculos sejam clicados novamente

  moleElements.forEach(mole => {
    mole.classList.remove('green', 'yellow', 'red'); // Limpa a cor anterior
    const rand = Math.random();
    
    if (rand < 0.4) {
      mole.classList.add('green');
    } else if (rand < 0.7) {
      mole.classList.add('yellow');
    } else {
      mole.classList.add('red');
    }
  });

  // Acelera a transição de cores nos últimos 10 segundos
  if (remainingTime <= 10) {
    clearInterval(gameInterval);
    gameInterval = setInterval(applyRandomColors, 500);
  }
}